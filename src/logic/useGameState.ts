import { useState, useEffect, useCallback } from 'react';
import { generateProblem } from './mathGenerator';
import { generateWordProblem } from './wordGenerator';
import type { GameProblem } from '../components/SwipeCard';
import { useSound } from './useSound';
import { loadStats, saveStats, loadProblemStats, saveProblemStats } from './storage';
import { checkNewAchievements } from './achievements';

const INITIAL_TIME = 60; // 60 seconds
const SCORE_PER_CORRECT = 10;
const TIME_BONUS_PER_CORRECT = 5;
const TIME_PENALTY_PER_WRONG = 5;

export function useGameState() {
  const { playCorrect, playWrong, playStart, playGameOver, startBgm, stopBgm, setAnxiety } = useSound();
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [gameMode, setGameMode] = useState<'math' | 'words'>('math');
  const [score, setScore] = useState(0);
  const [sessionPointsEarned, setSessionPointsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [level, setLevel] = useState(1);
  const [currentProblem, setCurrentProblem] = useState<GameProblem | null>(null);

  const [isNewRecord, setIsNewRecord] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);

  const startGame = useCallback((mode: 'math' | 'words' = 'math') => {
    const globalStats = loadStats();
    let initialLevel = 1;
    
    // Умный старт: если игрок хорошо справляется, начинаем не с 1 уровня
    if (globalStats.totalCorrectAnswers > 200 && globalStats.maxLevel >= 5) {
      initialLevel = 3;
    } else if (globalStats.totalCorrectAnswers > 50 && globalStats.maxLevel >= 3) {
      initialLevel = 2;
    }

    const currentProblemStats = loadProblemStats();

    setGameMode(mode);
    playStart();
    setGameState('playing');
    setScore((initialLevel - 1) * 100); 
    setTimeLeft(INITIAL_TIME);
    setLevel(initialLevel);
    setCurrentProblem(mode === 'math' 
      ? generateProblem(initialLevel, currentProblemStats) 
      : generateWordProblem(initialLevel, currentProblemStats));
    startBgm(); 
    setAnxiety(0); 
    setSessionCorrect(0);
    setSessionWrong(0);
    setSessionPointsEarned(0);
    setIsNewRecord(false);
    setNewAchievements([]);
  }, [playStart, startBgm, setAnxiety]);

  const handleAnswer = useCallback((answer: number | string) => {
    if (gameState !== 'playing' || !currentProblem) return false;

    const problemStats = loadProblemStats();
    
    // Для математики ключ это строка "1 + 2", для слов - просто само правильное слово
    const problemKey = currentProblem.type === 'math' 
      ? `${currentProblem.num1} ${currentProblem.operator} ${currentProblem.num2}`
      : currentProblem.answer;
    
    if (!problemStats[problemKey]) {
      problemStats[problemKey] = { correct: 0, wrong: 0, lastSeen: Date.now() };
    }
    problemStats[problemKey].lastSeen = Date.now();

    if (answer === currentProblem.answer) {
      problemStats[problemKey].correct++;
      saveProblemStats(problemStats);

      // Dynamic Score Calculation
      const globalStats = loadStats();
      const currentStreak = globalStats.currentStreak || 1;
      const streakScoreBase = globalStats.streakScore || 0;
      const currentTotalStreakScore = streakScoreBase + sessionPointsEarned;
      
      const targetScore = currentStreak * 140;
      
      // Streak bonus (visible, +20% per day, max x2.0)
      const maxStreakBonus = 2.0;
      const streakBonus = Math.min(1.0 + (currentStreak - 1) * 0.2, maxStreakBonus);
      
      // Quota rubber-banding (hidden)
      const ratio = targetScore / (currentTotalStreakScore + 10);
      const quotaMultiplier = Math.max(0.1, Math.min(5.0, ratio));
      
      // Combine and round
      const pointsGained = Math.round(SCORE_PER_CORRECT * streakBonus * quotaMultiplier);
      const finalPoints = Math.max(1, pointsGained);

      playCorrect();
      setSessionCorrect(s => s + 1);
      setSessionPointsEarned(s => s + finalPoints);
      setScore(s => s + finalPoints);
      setTimeLeft(t => Math.min(t + TIME_BONUS_PER_CORRECT, INITIAL_TIME));
      
      const newScore = score + finalPoints;
      const newLevel = Math.floor(newScore / 100) + 1;
      setLevel(newLevel);
      
      setCurrentProblem(gameMode === 'math' 
        ? generateProblem(newLevel, problemStats)
        : generateWordProblem(newLevel, problemStats));
      return true;
    } else {
      problemStats[problemKey].wrong++;
      saveProblemStats(problemStats);

      playWrong();
      setSessionWrong(s => s + 1);
      setTimeLeft(t => Math.max(t - TIME_PENALTY_PER_WRONG, 0));
      return false;
    }
  }, [gameState, currentProblem, score, playCorrect, playWrong]);

  // Обновление таймера и фоновой музыки (Anxiety System)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        const newTime = t - 1;
        
        // Уровень тревожности растет по мере приближения времени к 0
        // (От 0 до 1)
        const anxiety = Math.max(0, (INITIAL_TIME - newTime) / INITIAL_TIME);
        // Делаем рост тревоги более экспоненциальным под конец
        setAnxiety(Math.pow(anxiety, 2));

        if (newTime <= 0) {
          clearInterval(timer);
          setGameState('gameOver');
          stopBgm();
          playGameOver();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, playGameOver, startBgm, stopBgm, setAnxiety]);

  // Сохранение статистики и проверка ачивок при окончании игры
  useEffect(() => {
    if (gameState === 'gameOver') {
      const stats = loadStats();
      
      const newRecord = score > stats.highScore;
      if (newRecord) {
        setIsNewRecord(true);
      }

      const newStats = {
        ...stats,
        highScore: Math.max(stats.highScore, score),
        maxLevel: Math.max(stats.maxLevel, level),
        gamesPlayed: stats.gamesPlayed + 1,
        totalCorrectAnswers: stats.totalCorrectAnswers + sessionCorrect,
        totalWrongAnswers: stats.totalWrongAnswers + sessionWrong,
        streakScore: (stats.streakScore || 0) + sessionPointsEarned,
      };

      const unlocked = checkNewAchievements(newStats, stats.unlockedAchievements);
      if (unlocked.length > 0) {
        newStats.unlockedAchievements = [...stats.unlockedAchievements, ...unlocked];
        setNewAchievements(unlocked);
      }

      saveStats(newStats);
    }
  }, [gameState, score, level, sessionCorrect, sessionWrong]);

  return {
    gameState,
    gameMode,
    score,
    timeLeft,
    level,
    currentProblem,
    isNewRecord,
    newAchievements,
    startGame,
    handleAnswer,
  };
}

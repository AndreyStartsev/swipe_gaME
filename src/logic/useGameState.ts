import { useState, useEffect, useCallback } from 'react';
import { generateProblem } from './mathGenerator';
import type { MathProblem } from './mathGenerator';
import { useSound } from './useSound';
import { loadStats, saveStats } from './storage';
import { checkNewAchievements } from './achievements';

const INITIAL_TIME = 60; // 60 seconds
const SCORE_PER_CORRECT = 10;
const TIME_BONUS_PER_CORRECT = 5;
const TIME_PENALTY_PER_WRONG = 5;

export function useGameState() {
  const { playCorrect, playWrong, playStart, playGameOver, startBgm, stopBgm, setAnxiety } = useSound();
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [level, setLevel] = useState(1);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);

  const [isNewRecord, setIsNewRecord] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);

  const startGame = useCallback(() => {
    playStart();
    setGameState('playing');
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setLevel(1);
    setCurrentProblem(generateProblem(1));
    startBgm(); // Включаем процедурную фоновую музыку
    setAnxiety(0); 
    setSessionCorrect(0);
    setSessionWrong(0);
    setIsNewRecord(false);
    setNewAchievements([]);
  }, [playStart, startBgm, setAnxiety]);

  const handleAnswer = useCallback((answer: number) => {
    if (gameState !== 'playing' || !currentProblem) return false;

    if (answer === currentProblem.answer) {
      playCorrect();
      setSessionCorrect(s => s + 1);
      setScore(s => s + SCORE_PER_CORRECT);
      setTimeLeft(t => Math.min(t + TIME_BONUS_PER_CORRECT, INITIAL_TIME));
      
      const newScore = score + SCORE_PER_CORRECT;
      const newLevel = Math.floor(newScore / 50) + 1;
      setLevel(newLevel);
      
      setCurrentProblem(generateProblem(newLevel));
      return true;
    } else {
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

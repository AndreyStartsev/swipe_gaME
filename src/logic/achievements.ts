import type { GameStats } from './storage';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji character for now
  condition: (stats: GameStats, sessionStats?: GameStats) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'Первая кровь',
    description: 'Сыграть 1 игру',
    icon: '🎮',
    condition: (stats) => stats.gamesPlayed >= 1,
  },
  {
    id: 'veteran',
    title: 'Ветеран',
    description: 'Сыграть 10 игр',
    icon: '🚀',
    condition: (stats) => stats.gamesPlayed >= 10,
  },
  {
    id: 'centurion',
    title: 'Центурион',
    description: 'Набрать 100 очков (в сумме за все время или за раз)',
    icon: '💯',
    condition: (stats) => stats.highScore >= 100 || (stats.totalCorrectAnswers * 10 >= 100),
  },
  {
    id: 'math_genius',
    title: 'Гений',
    description: 'Набрать 500 очков в одной игре',
    icon: '🧠',
    condition: (stats) => stats.highScore >= 500,
  },
  {
    id: 'sniper',
    title: 'Снайпер',
    description: 'Дать 100 правильных ответов за все время',
    icon: '🎯',
    condition: (stats) => stats.totalCorrectAnswers >= 100,
  },
  {
    id: 'survivor',
    title: 'Выживший',
    description: 'Достигнуть 5-го уровня',
    icon: '🛡️',
    condition: (stats) => stats.maxLevel >= 5,
  },
];

export function checkNewAchievements(currentStats: GameStats, oldUnlocked: string[]): string[] {
  const newUnlocks: string[] = [];
  
  for (const achievement of ACHIEVEMENTS) {
    if (!oldUnlocked.includes(achievement.id)) {
      if (achievement.condition(currentStats)) {
        newUnlocks.push(achievement.id);
      }
    }
  }
  
  return newUnlocks;
}

export interface GameStats {
  highScore: number;
  maxLevel: number;
  gamesPlayed: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  unlockedAchievements: string[];
  lastLoginDate?: string;
  currentStreak?: number;
  streakScore?: number;
  language?: 'ru' | 'en' | 'fr' | 'he';
}

export interface ProblemStats {
  [problemKey: string]: {
    correct: number;
    wrong: number;
    lastSeen: number;
  };
}

const STORAGE_KEY = 'math_swipe_stats';
const PROBLEM_STORAGE_KEY = 'math_swipe_problems';

const DEFAULT_STATS: GameStats = {
  highScore: 0,
  maxLevel: 1,
  gamesPlayed: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  unlockedAchievements: [],
  lastLoginDate: '',
  currentStreak: 0,
  streakScore: 0,
  language: 'ru',
};

export function loadStats(): GameStats {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    let stats = { ...DEFAULT_STATS };
    if (data) {
      stats = { ...stats, ...JSON.parse(data) };
    }
    
    // Streak checking
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastLoginDate !== today) {
      if (stats.lastLoginDate) {
        const lastDate = new Date(stats.lastLoginDate);
        const currentDate = new Date(today);
        // Reset time to midnight to calculate pure day differences
        lastDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          stats.currentStreak = (stats.currentStreak || 0) + 1;
        } else {
          stats.currentStreak = 1;
          stats.streakScore = 0;
        }
      } else {
        stats.currentStreak = 1;
        stats.streakScore = 0;
      }
      stats.lastLoginDate = today;
      // We do not save immediately here to avoid write loops on simple reads, 
      // but it will be saved naturally on game over.
    }
    return stats;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
  return { ...DEFAULT_STATS };
}

export function saveStats(stats: GameStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
}

export function loadProblemStats(): ProblemStats {
  try {
    const data = localStorage.getItem(PROBLEM_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load problem stats:', error);
  }
  return {};
}

export function saveProblemStats(stats: ProblemStats): void {
  try {
    localStorage.setItem(PROBLEM_STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save problem stats:', error);
  }
}

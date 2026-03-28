export interface GameStats {
  highScore: number;
  maxLevel: number;
  gamesPlayed: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  unlockedAchievements: string[];
}

const STORAGE_KEY = 'math_swipe_stats';

const DEFAULT_STATS: GameStats = {
  highScore: 0,
  maxLevel: 1,
  gamesPlayed: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  unlockedAchievements: [],
};

export function loadStats(): GameStats {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...DEFAULT_STATS, ...JSON.parse(data) };
    }
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

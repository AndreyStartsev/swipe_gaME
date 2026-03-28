import { ArrowLeft, Trophy } from 'lucide-react';
import { loadStats } from '../logic/storage';
import { ACHIEVEMENTS } from '../logic/achievements';
import { useSound } from '../logic/useSound';

interface Props {
  onBack: () => void;
}

export function AchievementsScreen({ onBack }: Props) {
  const { playStart } = useSound();
  const stats = loadStats();
  const unlockedIds = stats.unlockedAchievements;

  const handleBack = () => {
    playStart();
    onBack();
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-[100dvh] bg-transparent text-white overflow-hidden py-10 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-black to-black pointer-events-none" />

      {/* Header */}
      <div className="z-10 w-full max-w-md flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
          Достижения
        </h2>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>

      {/* Stats Summary */}
      <div className="z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 flex justify-between items-center shadow-[0_0_30px_rgba(0,100,255,0.1)]">
        <div>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">Рекорд</p>
          <p className="text-4xl font-black text-white">{stats.highScore}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">Игр сыграно</p>
          <p className="text-2xl font-bold text-gray-200">{stats.gamesPlayed}</p>
        </div>
      </div>

      {/* Achievements List */}
      <div className="z-10 w-full max-w-md space-y-4 pb-20 overflow-y-auto">
        {ACHIEVEMENTS.map((achieve) => {
          const isUnlocked = unlockedIds.includes(achieve.id);
          
          return (
            <div 
              key={achieve.id}
              className={`flex items-center p-4 rounded-2xl border transition-all ${
                isUnlocked 
                  ? 'bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'bg-black/50 border-white/5 opacity-60 grayscale'
              }`}
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl mr-4 ${
                isUnlocked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-500'
              }`}>
                {achieve.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                  {achieve.title}
                </h3>
                <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                  {achieve.description}
                </p>
              </div>
              <div className="ml-4">
                {isUnlocked ? (
                  <Trophy className="w-6 h-6 text-cyan-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

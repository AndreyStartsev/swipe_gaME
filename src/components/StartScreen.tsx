import { Trophy } from 'lucide-react';
import { loadStats } from '../logic/storage';

interface Props {
  onStart: (mode: 'math' | 'words' | 'comics') => void;
  onOpenAchievements: () => void;
}

export function StartScreen({ onStart, onOpenAchievements }: Props) {
  const stats = loadStats();
  const { highScore, currentStreak = 1 } = stats;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[100dvh] bg-transparent text-white overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="z-10 flex flex-col items-center space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-[90px] leading-[0.8] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
            MATH<br/>SWIPE
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-[250px] mx-auto leading-tight">
            Тяни пример в сторону верного ответа на скорость
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onStart('math')}
              className="group flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-fuchsia-600 text-white rounded-3xl transition-transform active:scale-90 hover:scale-105 border-2 border-fuchsia-400 shadow-[0_0_30px_rgba(219,39,119,0.6)]"
            >
              <span className="text-[40px] mb-2 drop-shadow-md pb-1">🧮</span>
              <span className="text-xs font-black uppercase tracking-widest">Цифры</span>
            </button>
            <button
              onClick={() => onStart('words')}
              className="group flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-cyan-600 text-white rounded-3xl transition-transform active:scale-90 hover:scale-105 border-2 border-cyan-400 shadow-[0_0_30px_rgba(8,145,178,0.6)]"
            >
              <span className="text-[40px] mb-2 drop-shadow-md pb-1">🌟</span>
              <span className="text-xs font-black uppercase tracking-widest">Слова</span>
            </button>
            <button
              onClick={() => onStart('comics')}
              className="group flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-amber-500 text-white rounded-3xl transition-transform active:scale-90 hover:scale-105 border-2 border-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.6)]"
            >
              <span className="text-[40px] mb-2 drop-shadow-md pb-1">🗯️</span>
              <span className="text-xs font-black uppercase tracking-widest">Комиксы</span>
            </button>
          </div>
          
          <div className="flex items-center gap-6 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Рекорд</span>
              <span className="text-2xl font-black text-white">{highScore}</span>
            </div>
            
            {currentStreak > 1 && (
              <div className="flex flex-col items-center ml-2 border-l border-white/10 pl-6">
                <span className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                  🔥 Серия
                </span>
                <span className="text-lg font-black text-orange-300">
                  {currentStreak} дней (x{Math.min(1.0 + (currentStreak - 1) * 0.2, 2.0).toFixed(1)})
                </span>
              </div>
            )}
            
            <button
              onClick={onOpenAchievements}
              className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <Trophy className="w-6 h-6 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

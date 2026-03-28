import { RotateCcw } from 'lucide-react';
import { ACHIEVEMENTS } from '../logic/achievements';

interface Props {
  score: number;
  level: number;
  isNewRecord: boolean;
  newAchievements: string[];
  onRestart: () => void;
}

export function GameOverScreen({ score, level, isNewRecord, newAchievements, onRestart }: Props) {
  const unlocked = ACHIEVEMENTS.filter(a => newAchievements.includes(a.id));

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[100dvh] bg-transparent text-white overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-rose-900/40 via-black to-black pointer-events-none" />

      <div className="z-10 flex flex-col items-center space-y-16">
        <div className="text-center space-y-2">
          <h2 className="text-6xl font-black italic tracking-tighter text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]">
            ТАЙМАУТ
          </h2>
          <p className="text-gray-400 font-medium text-lg uppercase tracking-widest">Уровень {level}</p>
        </div>

        <div className="flex flex-col items-center gap-4 relative">
          {isNewRecord && (
            <div className="absolute -top-10 px-4 py-1 bg-cyan-500/20 border border-cyan-400 text-cyan-400 text-xs font-black uppercase tracking-widest rounded-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              Новый Рекорд!
            </div>
          )}
          <div className="text-[120px] leading-none font-black text-white tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            {score}
          </div>
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Итоговый счет</span>
        </div>

        {unlocked.length > 0 && (
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <h3 className="text-center text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Получены достижения</h3>
            {unlocked.map(achieve => (
              <div key={achieve.id} className="flex items-center bg-white/10 rounded-xl p-3 border border-cyan-500/30">
                <span className="text-2xl mr-3">{achieve.icon}</span>
                <span className="font-bold text-white text-sm">{achieve.title}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onRestart}
          className="group relative flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-transform active:scale-90 hover:scale-105 outline-none"
          style={{ boxShadow: '0 0 50px rgba(255,255,255,0.3)' }}
        >
          <RotateCcw className="w-6 h-6 mr-3 stroke-[3]" />
          Попробуй еще
        </button>
      </div>
    </div>
  );
}

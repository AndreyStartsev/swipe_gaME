import type { MathProblem } from '../logic/mathGenerator';
import { SwipeCard } from './SwipeCard';

interface Props {
  score: number;
  timeLeft: number;
  level: number;
  problem: MathProblem;
  onAnswer: (answer: number) => void;
}

export function GameScreen({ score, timeLeft, level, problem, onAnswer }: Props) {
  const timerWarning = timeLeft <= 10;
  const progressPercent = Math.min((timeLeft / 60) * 100, 100);

  return (
    <div className="relative w-full h-[100dvh] bg-transparent flex flex-col overflow-hidden text-white">
      
      {/* Laser Beam Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[6px] z-50">
        <div 
          className={`relative h-full transition-all duration-1000 ease-linear 
            ${timerWarning 
              ? 'bg-gradient-to-r from-transparent via-rose-500 to-white shadow-[0_0_25px_rgba(244,63,94,1)]' 
              : 'bg-gradient-to-r from-transparent via-cyan-400 to-white shadow-[0_0_25px_rgba(34,211,238,1)]'
            }`}
          style={{ width: `${progressPercent}%` }}
        >
          {/* Яркая 'голова' луча */}
          <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-16 h-10 rounded-full blur-[10px] 
            ${timerWarning ? 'bg-rose-500' : 'bg-cyan-400'}`} 
          />
          {/* Ядро (core) лазера */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-[8px] bg-white rounded-full blur-[2px] shadow-[0_0_20px_#ffffff]" />
        </div>
      </div>

      <div className="absolute top-8 left-6 z-40 pointer-events-none">
        <div className="text-4xl font-black italic tracking-tighter drop-shadow-md">{score}</div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Очки</div>
      </div>
      
      <div className="absolute top-8 right-6 z-40 text-right pointer-events-none">
        <div className={`text-5xl font-black italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] ${timerWarning ? 'text-rose-500 animate-pulse shadow-rose-500' : 'text-white'}`}>
          {timeLeft}
        </div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">LVL {level}</div>
      </div>

      <div className="flex-1 relative flex items-center justify-center h-full w-full">
        
        <div className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-10" />

        {/* Top: Neon Fuchsia */}
        <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
          <div className="relative flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
            <span className="relative text-4xl md:text-5xl font-black text-fuchsia-50 drop-shadow-[0_0_20px_rgba(232,121,249,1)]">
              {problem.options[0]}
            </span>
          </div>
        </div>

        {/* Bottom: Toxic Lime */}
        <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
          <div className="relative flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-lime-500/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
            <span className="relative text-4xl md:text-5xl font-black text-lime-50 drop-shadow-[0_0_20px_rgba(163,230,53,1)]">
              {problem.options[1]}
            </span>
          </div>
        </div>

        {/* Left: Electric Orange */}
        <div className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
          <div className="relative flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
            <span className="relative text-4xl md:text-5xl font-black text-orange-50 drop-shadow-[0_0_20px_rgba(251,146,60,1)]">
              {problem.options[2]}
            </span>
          </div>
        </div>

        {/* Right: Deep Sky Blue */}
        <div className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
          <div className="relative flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
            <span className="relative text-4xl md:text-5xl font-black text-blue-50 drop-shadow-[0_0_20px_rgba(96,165,250,1)]">
               {problem.options[3]}
            </span>
          </div>
        </div>
        
        <SwipeCard problem={problem} onAnswer={onAnswer} />
        
      </div>
      
    </div>
  );
}

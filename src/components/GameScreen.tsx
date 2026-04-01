import type { GameProblem } from './SwipeCard';
import { SwipeCard } from './SwipeCard';
import type { WordOption } from '../logic/wordGenerator';

interface Props {
  score: number;
  timeLeft: number;
  level: number;
  problem: GameProblem;
  onAnswer: (answer: number | string) => void;
}

export function GameScreen({ score, timeLeft, level, problem, onAnswer }: Props) {
  const timerWarning = timeLeft <= 10;
  const progressPercent = Math.min((timeLeft / 60) * 100, 100);

  const renderComicFrame = (frame: any, isSolved: boolean) => {
    const isImage = !!frame.imageUrl;
    return (
      <div className="relative w-full h-full border border-slate-900 bg-black overflow-hidden">
        {isImage ? (
          <img src={frame.imageUrl} alt={frame.text} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <frame.icon className="w-16 h-16 sm:w-24 sm:h-24 text-white/50" strokeWidth={1.5} />
          </div>
        )}
        {/* Comic Caption Box */}
        <div 
          className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 bg-white text-black font-black px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-lg md:text-xl leading-tight text-center border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)]"
          dir="auto"
        >
          {isSolved ? frame.translations[(problem as Extract<GameProblem, { type: 'comics' }>).language] : "..."}
        </div>
      </div>
    );
  };

  const renderOption = (value: number | string | WordOption, colorClass: string) => {
    if (typeof value === 'object' && value !== null && 'id' in value) {
      const isLongWord = value.text && value.text.length > 8;
      const textClass = isLongWord 
        ? "text-base sm:text-2xl md:text-5xl" 
        : "text-xl sm:text-3xl md:text-5xl";
        
      return (
        <span className={`relative flex items-center justify-center font-black ${colorClass}`}>
          {value.icon ? (
            <value.icon className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2} />
          ) : (
            <span 
              className={`${textClass} max-w-[120px] sm:max-w-[140px] md:max-w-none text-center leading-[1.1] md:leading-tight [hyphens:auto]`}
              dir="auto"
            >
              {value.text?.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </span>
          )}
        </span>
      );
    }
    return (
      <span className={`relative text-2xl sm:text-4xl md:text-5xl font-black ${colorClass}`}>
        {value as string | number}
      </span>
    );
  };

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
        
        {problem.type !== 'comics' && (
          <div className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-10" />
        )}

        {problem.type === 'comics' ? (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2">
              {renderComicFrame(problem.options[0], problem.solvedFrames.includes(problem.options[0].id))}
              {renderComicFrame(problem.options[1], problem.solvedFrames.includes(problem.options[1].id))}
              {renderComicFrame(problem.options[2], problem.solvedFrames.includes(problem.options[2].id))}
              {renderComicFrame(problem.options[3], problem.solvedFrames.includes(problem.options[3].id))}
            </div>
          </div>
        ) : (
          <>
            {/* Top: Neon Fuchsia */}
            <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
              <div className="relative flex items-center justify-center p-4 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
                {renderOption(problem.options[0], "text-fuchsia-50 drop-shadow-[0_0_20px_rgba(232,121,249,1)]")}
              </div>
            </div>

            {/* Bottom: Toxic Lime */}
            <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
              <div className="relative flex items-center justify-center p-4 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-lime-500/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
                {renderOption(problem.options[1], "text-lime-50 drop-shadow-[0_0_20px_rgba(163,230,53,1)]")}
              </div>
            </div>

            {/* Left: Electric Orange */}
            <div className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
              <div className="relative flex items-center justify-center p-4 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
                {renderOption(problem.options[2], "text-orange-50 drop-shadow-[0_0_20px_rgba(251,146,60,1)]")}
              </div>
            </div>

            {/* Right: Deep Sky Blue */}
            <div className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-90 transition-opacity z-30 pointer-events-none">
              <div className="relative flex items-center justify-center p-4 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-l from-blue-500/60 to-transparent blur-[25px] rounded-full mix-blend-screen" />
                {renderOption(problem.options[3], "text-blue-50 drop-shadow-[0_0_20px_rgba(96,165,250,1)]")}
              </div>
            </div>
          </>
        )}
        
        <SwipeCard problem={problem} onAnswer={onAnswer} />
        
      </div>
      
    </div>
  );
}

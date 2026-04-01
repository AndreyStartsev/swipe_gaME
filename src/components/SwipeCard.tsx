import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import type { MathProblem } from '../logic/mathGenerator';
import type { WordProblem } from '../logic/wordGenerator';
import type { ComicProblem } from '../logic/comicsGenerator';

export type GameProblem = MathProblem | WordProblem | ComicProblem;

interface Props {
  problem: GameProblem;
  onAnswer: (answer: number | string) => void;
}

export function SwipeCard({ problem, onAnswer }: Props) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-5, 5]);
  const scale = useTransform(y, [-300, 300], [0.98, 1.02]);
  const backgroundColor = useMotionValue(problem.type === 'comics' ? 'transparent' : 'rgba(5, 5, 5, 0.2)');

  useEffect(() => {
    if (problem.type === 'comics') {
      backgroundColor.set('transparent');
    } else {
      backgroundColor.set('rgba(5, 5, 5, 0.2)');
    }
  }, [problem.type, backgroundColor]);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.25, duration: 0.4 }
    });
  }, [problem, controls]);

  const bind = useDrag(({ active, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy] }) => {
    if (active) {
      x.set(mx);
      y.set(my);
      if (problem.type !== 'comics') {
        backgroundColor.set('rgba(25, 25, 25, 0.4)');
      }
    } else {
      if (problem.type !== 'comics') {
        backgroundColor.set('rgba(5, 5, 5, 0.2)');
      }
      
      // Энергия свайпа = пройденное расстояние + резкость(velocity)
      // Теперь легкий, но резкий бросок (флик) тоже засчитается!
      const energyX = Math.abs(mx) + (vx * 200);
      const energyY = Math.abs(my) + (vy * 200);

      const isSwipeX = energyX > 100;
      const isSwipeY = energyY > 100;

      let answeredIndex = -1;
      let targetX = 0;
      let targetY = 0;

      if (problem.type === 'comics') {
        const isSwipeAny = (energyX + energyY) > 150;
        if (!isSwipeAny) {
          controls.start({ x: 0, y: 0, transition: { type: "spring", bounce: 0.35, duration: 0.4 } });
          return;
        }

        const isRight = (vx > 0.3 ? dx > 0 : mx > 0);
        const isDown = (vy > 0.3 ? dy > 0 : my > 0);

        if (!isRight && !isDown) {
          answeredIndex = 0; 
          targetX = -1000;
          targetY = -1200;
        } else if (isRight && !isDown) {
          answeredIndex = 1; 
          targetX = 1000;
          targetY = -1200;
        } else if (!isRight && isDown) {
          answeredIndex = 2; 
          targetX = -1000;
          targetY = 1200;
        } else {
          answeredIndex = 3; 
          targetX = 1000;
          targetY = 1200;
        }
      } else {
        if (!isSwipeX && !isSwipeY) {
          controls.start({ x: 0, y: 0, transition: { type: "spring", bounce: 0.35, duration: 0.4 } });
          return;
        }

        if (isSwipeX && energyX > energyY) {
          const swipeRight = vx > 0.5 ? dx > 0 : mx > 0;
          answeredIndex = swipeRight ? 3 : 2; 
          targetX = swipeRight ? 1000 : -1000;
          targetY = my;
        } else {
          const swipeDown = vy > 0.5 ? dy > 0 : my > 0;
          answeredIndex = swipeDown ? 1 : 0; 
          targetY = swipeDown ? 1200 : -1200; 
          targetX = mx;
        }
      }

      const option = problem.options[answeredIndex];
      const answerVal = typeof option === 'object' && option !== null && 'id' in option ? option.id : option;
      const isCorrect = answerVal === problem.answer;

      if (isCorrect) {
        const velocityScale = Math.max(vx, vy);
        // Вместо долго затухающей пружины (spring) используем быстрый tween (0.1 - 0.25 сек в зависимости от резкости)
        const flyDuration = Math.max(0.1, 0.25 - velocityScale * 0.05);
        
        controls.start({
          x: targetX,
          y: targetY,
          opacity: 0,
          scale: 0.8,
          transition: { duration: flyDuration, ease: "easeOut" }
        }).then(() => {
          x.set(0);
          y.set(1200); 
          onAnswer(answerVal as string | number);
        });
      } else {
        onAnswer(answerVal as string | number);
        backgroundColor.set('rgba(150, 0, 0, 0.5)'); 
        controls.start({
          x: [targetX * 0.1, -25, 25, -20, 20, 0],
          y: [targetY * 0.1, 0, 0, 0, 0, 0],
          transition: { duration: 0.35, ease: "easeOut" }
        }).then(() => {
          if (problem.type !== 'comics') {
            backgroundColor.set('rgba(5, 5, 5, 0.2)');
          } else {
            backgroundColor.set('transparent');
          }
        });
      }
    }
  });

  return (
    <motion.div
      {...(bind() as any)}
      style={{ x, y, rotate, scale, backgroundColor }}
      animate={controls}
      initial={{ y: 1200, opacity: 0, scale: 0.9 }}
      className={`absolute z-20 w-[100vw] h-[100dvh] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none overflow-hidden ${
        problem.type === 'comics'
          ? ''
          : 'shadow-[0_0_100px_rgba(0,0,0,0.9)] backdrop-blur-[8px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]'
      }`}
    >
      {problem.type !== 'comics' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
      
      <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full h-full p-8 pointer-events-none">
        {problem.type === 'math' ? (
          <>
            <div className="text-8xl md:text-[160px] leading-none font-black text-white tracking-tighter [text-shadow:0_4px_20px_rgba(255,255,255,0.3)] will-change-transform">
              {problem.num1}
            </div>
            <div className="text-5xl md:text-7xl font-bold text-gray-500">
              {problem.operator}
            </div>
            <div className="text-8xl md:text-[160px] leading-none font-black text-white tracking-tighter [text-shadow:0_4px_20px_rgba(255,255,255,0.3)] will-change-transform">
              {problem.num2}
            </div>
          </>
        ) : problem.type === 'comics' ? (
          <div className="flex items-center justify-center bg-white text-slate-800 rounded-full w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 shadow-[0_10px_50px_rgba(255,255,255,0.3)] border-[6px] border-slate-100 p-4 shrink-0">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-center leading-tight break-words [hyphens:auto]">
              {problem.frames.find(f => f.id === problem.currentFrameId)?.text}
            </span>
          </div>
        ) : (
          problem.variant === 'icon-to-word' ? (
            <div className="text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.6)] will-change-transform flex items-center justify-center">
              {problem.centerIcon && <problem.centerIcon className="w-28 h-28 sm:w-48 sm:h-48 md:w-72 md:h-72" strokeWidth={1.5} />}
            </div>
          ) : (
            <div className="text-4xl sm:text-6xl md:text-[100px] leading-none font-black text-white tracking-tighter [text-shadow:0_4px_30px_rgba(255,255,255,0.6)] will-change-transform max-w-[80vw] text-center drop-shadow-xl p-4 break-words">
              {problem.centerText}
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}

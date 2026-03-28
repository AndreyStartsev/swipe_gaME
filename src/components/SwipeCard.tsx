import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import type { MathProblem } from '../logic/mathGenerator';

interface Props {
  problem: MathProblem;
  onAnswer: (answer: number) => void;
}

export function SwipeCard({ problem, onAnswer }: Props) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-300, 300], [-5, 5]);
  const scale = useTransform(y, [-300, 300], [0.98, 1.02]);
  const backgroundColor = useMotionValue('rgba(5, 5, 5, 0.2)');

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
      backgroundColor.set('rgba(25, 25, 25, 0.4)');
    } else {
      backgroundColor.set('rgba(5, 5, 5, 0.2)');
      
      // Энергия свайпа = пройденное расстояние + резкость(velocity)
      // Теперь легкий, но резкий бросок (флик) тоже засчитается!
      const energyX = Math.abs(mx) + (vx * 200);
      const energyY = Math.abs(my) + (vy * 200);

      const isSwipeX = energyX > 100;
      const isSwipeY = energyY > 100;

      if (!isSwipeX && !isSwipeY) {
        // Упругий возврат с быстрым затуханием
        controls.start({ x: 0, y: 0, transition: { type: "spring", bounce: 0.35, duration: 0.4 } });
        return;
      }

      let answeredIndex = -1;
      let targetX = 0;
      let targetY = 0;

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

      const answer = problem.options[answeredIndex];
      const isCorrect = answer === problem.answer;

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
          onAnswer(answer);
        });
      } else {
        onAnswer(answer);
        backgroundColor.set('rgba(150, 0, 0, 0.5)'); 
        controls.start({
          x: [targetX * 0.1, -25, 25, -20, 20, 0],
          y: [targetY * 0.1, 0, 0, 0, 0, 0],
          transition: { duration: 0.35, ease: "easeOut" }
        }).then(() => {
          backgroundColor.set('rgba(5, 5, 5, 0.2)');
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
      className="absolute z-20 w-[100vw] h-[100dvh] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_100px_rgba(0,0,0,0.9)] select-none touch-none overflow-hidden backdrop-blur-[8px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full h-full p-8 pointer-events-none">
        <div className="text-[140px] md:text-[180px] leading-none font-black text-white tracking-tighter [text-shadow:0_4px_20px_rgba(255,255,255,0.3)] will-change-transform">
          {problem.num1}
        </div>
        <div className="text-6xl md:text-7xl font-bold text-gray-500">
          {problem.operator}
        </div>
        <div className="text-[140px] md:text-[180px] leading-none font-black text-white tracking-tighter [text-shadow:0_4px_20px_rgba(255,255,255,0.3)] will-change-transform">
          {problem.num2}
        </div>
      </div>
    </motion.div>
  );
}

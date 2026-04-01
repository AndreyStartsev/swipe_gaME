import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

interface Props {
  imageUrl: string;
  onContinue: () => void;
}

export function BonusScreen({ imageUrl, onContinue }: Props) {
  const controls = useAnimation();
  const y = useMotionValue(0);

  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [controls]);

  const bind = useDrag(({ active, movement: [_, my], velocity: [__, vy], direction: [___, dy] }) => {
    if (active) {
      if (my < 0) {
        y.set(my);
      }
    } else {
      const isSwipeUp = my < -100 || (vy > 0.5 && dy < 0);
      if (isSwipeUp) {
        controls.start({ y: -1200, opacity: 0, scale: 0.9, transition: { duration: 0.3 } }).then(onContinue);
      } else {
        controls.start({ y: 0, transition: { type: "spring", bounce: 0.3 } });
      }
    }
  });

  return (
    <div className="absolute inset-0 bg-black z-50 overflow-hidden touch-none select-none flex items-center justify-center">
      <motion.img 
        {...(bind() as any)}
        style={{ y }}
        animate={controls}
        initial={{ scale: 1.1, opacity: 0, y: 0 }}
        src={imageUrl} 
        alt="Bonus Comic" 
        className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing" 
        draggable="false"
      />
    </div>
  );
}

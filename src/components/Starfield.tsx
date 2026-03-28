import { useEffect, useRef } from 'react';

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Учитываем разрешение экрана (High DPI / Retina)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const resizeObserver = new ResizeObserver(() => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    });
    resizeObserver.observe(document.body);

    const numStars = window.innerWidth < 768 ? 200 : 500; // Меньше звезд на телефонах для оптимизации
    const stars: { x: number; y: number; z: number; pz: number }[] = [];

    // Генерируем случайное положение звезд в 3D
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width * 2 - width,
        y: Math.random() * height * 2 - height,
        z: Math.random() * width,
        pz: Math.random() * width, 
      });
    }

    let animationFrameId: number;
    let speed = 4; // Скорость полета

    const animate = () => {
      // Эффект затухания для создания шлейфов от звезд
      ctx.fillStyle = 'rgba(2, 2, 2, 0.3)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= speed;

        // Когда звезда "пролетела" мимо камеры
        if (star.z <= 0) {
          star.x = Math.random() * width * 2 - width;
          star.y = Math.random() * height * 2 - height;
          star.z = width;
          star.pz = width; // Сбрасываем шлейф
        }

        // Проецирование 3D в 2D
        const k = 120 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 120 / star.pz;
        const ppx = star.x * pk + cx;
        const ppy = star.y * pk + cy;

        star.pz = star.z;

        // Рисуем шлейф звезды
        ctx.beginPath();
        // Чем ближе звезда, тем она ярче и толще
        ctx.lineWidth = (1 - star.z / width) * 3; 
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - star.z / width})`;
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }} 
    />
  );
}

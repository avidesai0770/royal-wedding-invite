import React, { useEffect, useRef } from 'react';

export const FloralPetalsCanvas: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const colors = [
      '#fda4af', '#f43f5e', '#fb7185', // Rose pinks
      '#f59e0b', '#fbbf24', '#fde047', // Marigold yellows
      '#fed7aa', '#fbcfe8'
    ];

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rot: number;
      rotSpeed: number;
      color: string;
      isRose: boolean;
      opacity: number;
    }

    const count = Math.min(Math.floor(width / 34), 38);
    const petals: Petal[] = Array.from({ length: count }, () => {
      const isRose = Math.random() > 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 7,
        speedY: Math.random() * 1.3 + 0.7,
        speedX: (Math.random() - 0.5) * 1.1,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        isRose,
        opacity: Math.random() * 0.4 + 0.45
      };
    });

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      if (p.isRose) {
        // Curved heart-shaped rose petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size * 1.35);
        ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      } else {
        // Oval marigold petal floret
        ctx.ellipse(0, 0, p.size * 0.4, p.size * 1.1, 0, 0, Math.PI * 2);
      }
      ctx.fillStyle = p.color;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.55 + p.speedX;
        p.rot += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20 w-full h-full" />;
};

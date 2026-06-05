'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: { x: number; y: number; z: number; size: number; color: string }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = [];
      const count = Math.min(200, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3,
          size: Math.random() * 2,
          color: ['#00d4ff', '#b347ea', '#00ffc8', '#ffffff'][Math.floor(Math.random() * 4)],
        });
      }
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: Math.random() * 200,
          maxLife: 200 + Math.random() * 200,
          color: Math.random() > 0.5 ? '#00d4ff' : '#b347ea',
        });
      }
    };

    const drawGrid = () => {
      const gridSize = 60;
      const horizonY = canvas.height * 0.85;
      const perspective = 400;

      ctx.save();
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let i = 0; i < 20; i++) {
        const y = horizonY + i * 15 * (1 + i * 0.15);
        if (y > canvas.height) break;
        const alpha = 0.06 * (1 - i / 20);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines (perspective)
      const centerX = canvas.width / 2;
      for (let i = -15; i <= 15; i++) {
        const x = centerX + i * gridSize;
        const alpha = 0.04 * (1 - Math.abs(i) / 15);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(centerX + (x - centerX) * 0.1, horizonY);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.restore();
    };

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid floor
      drawGrid();

      // Draw stars
      for (const star of stars) {
        const twinkle = 0.5 + Math.sin(time * 2 + star.x) * 0.5;
        ctx.globalAlpha = twinkle * (0.3 + star.z * 0.2);
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.5 + star.z * 0.3), 0, Math.PI * 2);
        ctx.fill();

        // Glow for brighter stars
        if (star.z > 2) {
          ctx.globalAlpha = twinkle * 0.1;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Slow drift
        star.y -= star.z * 0.05;
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
      }

      // Draw particles
      ctx.globalAlpha = 1;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = 0;
        }

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.9 ? (1 - lifeRatio) * 10 : 1;

        ctx.globalAlpha = alpha * 0.4;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.globalAlpha = alpha * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    initStars();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initStars();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}

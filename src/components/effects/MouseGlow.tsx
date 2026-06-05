'use client';

import { useMousePosition } from '@/hooks';

export default function MouseGlow() {
  const { position } = useMousePosition();

  return (
    <div
      className="fixed pointer-events-none z-[50] transition-all duration-300 ease-out hidden md:block"
      style={{
        left: position.x - 150,
        top: position.y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, rgba(179, 71, 234, 0.02) 40%, transparent 70%)',
        filter: 'blur(30px)',
      }}
    />
  );
}

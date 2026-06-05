'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks';

export default function FloatingElements() {
  const { normalized } = useMousePosition();

  const elements = [
    { x: '10%', y: '20%', size: 60, delay: 0, shape: 'hexagon' },
    { x: '85%', y: '15%', size: 40, delay: 1, shape: 'diamond' },
    { x: '75%', y: '70%', size: 50, delay: 0.5, shape: 'circle' },
    { x: '15%', y: '75%', size: 35, delay: 1.5, shape: 'square' },
    { x: '50%', y: '10%', size: 30, delay: 2, shape: 'triangle' },
    { x: '90%', y: '50%', size: 25, delay: 0.8, shape: 'circle' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            x: normalized.x * (15 + i * 5),
            y: normalized.y * (15 + i * 5),
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, i % 2 === 0 ? 180 : -180, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
        >
          {el.shape === 'hexagon' && (
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <polygon
                points="30,2 55,17 55,43 30,58 5,43 5,17"
                fill="none"
                stroke="rgba(0, 212, 255, 0.15)"
                strokeWidth="1"
              />
            </svg>
          )}
          {el.shape === 'diamond' && (
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <rect
                x="8"
                y="8"
                width="24"
                height="24"
                fill="none"
                stroke="rgba(179, 71, 234, 0.15)"
                strokeWidth="1"
                transform="rotate(45 20 20)"
              />
            </svg>
          )}
          {el.shape === 'circle' && (
            <svg viewBox="0 0 50 50" className="w-full h-full">
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="rgba(0, 255, 200, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          )}
          {el.shape === 'square' && (
            <svg viewBox="0 0 35 35" className="w-full h-full">
              <rect
                x="3"
                y="3"
                width="29"
                height="29"
                fill="none"
                stroke="rgba(0, 212, 255, 0.12)"
                strokeWidth="1"
              />
            </svg>
          )}
          {el.shape === 'triangle' && (
            <svg viewBox="0 0 30 30" className="w-full h-full">
              <polygon
                points="15,3 28,27 2,27"
                fill="none"
                stroke="rgba(179, 71, 234, 0.12)"
                strokeWidth="1"
              />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Floating data lines */}
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px"
          style={{
            left: `${left}%`,
            top: `${30 + i * 15}%`,
            width: '80px',
            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(0, 212, 255, 0.15)' : 'rgba(179, 71, 234, 0.15)'}, transparent)`,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}

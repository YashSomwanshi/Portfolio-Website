'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingStages = [
  { label: 'INITIALIZING SYSTEMS', duration: 600 },
  { label: 'LOADING ASSETS', duration: 500 },
  { label: 'COMPILING SKILLS', duration: 500 },
  { label: 'RENDERING PROJECTS', duration: 400 },
  { label: 'UNLOCKING ACHIEVEMENTS', duration: 400 },
  { label: 'SYSTEM READY', duration: 300 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    let currentStage = 0;

    const runStage = () => {
      if (currentStage >= loadingStages.length) {
        setIsComplete(true);
        setTimeout(onComplete, 600);
        return;
      }

      const stage = loadingStages[currentStage];
      const targetProgress = ((currentStage + 1) / loadingStages.length) * 100;
      const increment = (targetProgress - currentProgress) / (stage.duration / 16);

      setStageIndex(currentStage);

      const interval = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= targetProgress) {
          currentProgress = targetProgress;
          clearInterval(interval);
          currentStage++;
          setTimeout(runStage, 100);
        }
        setProgress(Math.min(currentProgress, 100));
      }, 16);
    };

    const startDelay = setTimeout(runStage, 400);
    return () => clearTimeout(startDelay);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-primary)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Scan lines overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.1) 2px, rgba(0,212,255,0.1) 4px)',
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {mounted && Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 2 === 0 ? 'var(--neon-blue)' : 'var(--neon-purple)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Logo / Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1
              className="text-4xl md:text-5xl font-bold tracking-widest mb-2"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              YASH SOMWANSHI
            </h1>
            <p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}
            >
              Portfolio System v2.0
            </p>
          </motion.div>

          {/* Progress bar container */}
          <div className="w-80 md:w-96">
            {/* Stage label */}
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-3"
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--neon-cyan)' }}
              />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}
              >
                {loadingStages[stageIndex]?.label}
              </span>
            </motion.div>

            {/* Progress track */}
            <div
              className="relative h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(0, 212, 255, 0.1)' }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple), var(--neon-cyan))',
                  boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
                }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between mt-2">
              <span
                className="text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              >
                SYS.LOAD
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-blue)' }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Bottom system text */}
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              Game Programmer • Software Developer
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

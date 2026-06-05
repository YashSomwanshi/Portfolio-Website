'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/hooks';
import { X, Lock, Unlock } from 'lucide-react';

const loreEntries = [
  { title: 'Origin Story', text: 'Started coding on a basic laptop, driven by the dream of creating games that would transport people to other worlds.' },
  { title: 'First Bug', text: 'Spent 6 hours debugging a missing semicolon. That was the day patience became a superpower.' },
  { title: 'The Spark', text: 'Building my first game prototype in Unity made me realize — this is what I\'m meant to do.' },
  { title: 'Philosophy', text: '"Every game is a universe. Every line of code is a law of physics. I don\'t write software — I create realities."' },
  { title: 'Secret Goal', text: 'One day, create a game that makes someone feel the same wonder I felt playing games as a kid.' },
];

export default function KonamiCode() {
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    setShowModal(true);
  }, []);

  useKonamiCode(handleUnlock);

  return (
    <>
      {/* Subtle hint in footer area */}
      <div className="text-center pb-12">
        <p
          className="text-[10px] tracking-wider cursor-default select-none"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(74, 82, 128, 0.3)' }}
          title="Try the Konami Code..."
        >
          ↑↑↓↓←→←→BA
        </p>
      </div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90%] max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl"
              style={{
                background: 'rgba(10, 14, 26, 0.95)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 0 60px rgba(255, 215, 0, 0.1), 0 0 120px rgba(179, 71, 234, 0.05)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Unlock size={18} style={{ color: 'var(--neon-gold)' }} />
                  </motion.div>
                  <span
                    className="text-sm tracking-wider uppercase font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-gold)' }}
                  >
                    Secret Achievement Unlocked!
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded transition-colors hover:bg-white/5"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <p
                    className="text-2xl mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    🎮
                  </p>
                  <h3
                    className="text-lg font-bold tracking-wider"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-gold)' }}
                  >
                    Developer Lore
                  </h3>
                  <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    You found the hidden developer backstory
                  </p>
                </motion.div>

                {loreEntries.map((entry, i) => (
                  <motion.div
                    key={entry.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 215, 0, 0.03)',
                      border: '1px solid rgba(255, 215, 0, 0.08)',
                    }}
                  >
                    <h4
                      className="text-xs tracking-wider uppercase mb-2 font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-gold)' }}
                    >
                      {entry.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                    >
                      {entry.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

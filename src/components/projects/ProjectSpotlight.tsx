'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { Gamepad2, GitFork, Layers, Cpu, Wrench, Star } from 'lucide-react';

const spotlightData = {
  title: 'VR Treasure Collector Simulator',
  subtitle: 'Featured Project Spotlight',
  tagline: 'An immersive virtual reality treasure-hunting sandbox',
  description: `VR Treasure Collector Simulator is a fully immersive virtual reality game that places players in detailed 3D dungeon environments. Players navigate, trigger event-driven mechanics, interact with physics-based items, and validate win loops.`,
  techStack: [
    { name: 'Unity 6', category: 'Engine' },
    { name: 'C#', category: 'Language' },
    { name: 'XR Toolkit', category: 'Locomotion' },
    { name: 'XR Simulator', category: 'Testing' },
    { name: 'Rigid Body', category: 'Physics' },
    { name: 'Dungeon Assets', category: 'Level Design' },
  ],
  challenges: [
    {
      title: 'XR Input & Locomotion',
      description: 'Routing controller inputs and implementing smooth locomotion bounds for VR tracking via XR Interaction Toolkit.',
    },
    {
      title: 'VR Physical Interactions',
      description: 'Ensuring realistic physics bounds, score triggers, and item picking behaviors inside dungeon geometry.',
    },
    {
      title: 'Game Loop Event Scripting',
      description: 'Structuring win loops, score states, and collection UI scripts using object-oriented design in C#.',
    },
  ],
  architecture: [
    'XR Interaction Toolkit controller routing logic',
    'Object-oriented scripting for game state tracking',
    'Custom score metrics and trigger-based boundaries',
    'Win conditions with UI system state checks',
    'Dungeon locomotion and navigation structures',
  ],
};

export default function ProjectSpotlight() {
  const { ref, isInView } = useInView(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255, 215, 0, 0.03), transparent 60%)',
        }}
      />

      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center text-center animate-fade-in"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Star size={18} style={{ color: 'var(--neon-gold)' }} />
            <span
              className="text-sm tracking-[0.3em] uppercase font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-gold)' }}
            >
              {spotlightData.subtitle}
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-center"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {spotlightData.title}
          </h2>
          <p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
          >
            {spotlightData.tagline}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12">
          {/* Left: Main content */}
          <div className="space-y-8">
            {/* Banner area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden h-64 md:h-80"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 107, 53, 0.05), rgba(15, 20, 50, 0.8))',
                border: '1px solid rgba(255, 215, 0, 0.15)',
              }}
            >
              {/* Fallback Icon */}
              <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
                <div className="text-center">
                  <Gamepad2 size={64} style={{ color: 'rgba(255, 215, 0, 0.2)' }} />
                  <p
                    className="mt-4 text-sm tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                  >
                    {'// GAME PREVIEW'}
                  </p>
                </div>
              </div>

              {/* Looping Gameplay Video */}
              <video
                ref={videoRef}
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center absolute inset-0 z-10"
              />

              {/* CRT Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] z-20" />

              {/* HUD overlay elements */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: '#00ffc8' }}>
                  LIVE
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
              >
                {spotlightData.description}
              </p>
            </motion.div>

            {/* Key Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3
                className="text-base md:text-lg tracking-wider uppercase mb-4 flex items-center gap-2 font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
              >
                <Wrench size={16} />
                Key Challenges Solved
              </h3>
              <div className="space-y-4">
                {spotlightData.challenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="glass-card"
                    style={{ padding: '22px 26px' }}
                  >
                    <h4
                      className="text-base font-bold tracking-wider mb-2"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-gold)' }}
                    >
                      {challenge.title}
                    </h4>
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                    >
                      {challenge.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Tech stack & Architecture */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass-card"
              style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
            >
              <h3
                className="text-base md:text-lg tracking-wider uppercase mb-4 flex items-center gap-2 font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
              >
                <Cpu size={16} />
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {spotlightData.techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-lg text-center transition-all duration-300 hover:scale-105"
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(255, 215, 0, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.1)',
                    }}
                  >
                    <p
                      className="text-sm font-bold tracking-wider"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-gold)' }}
                    >
                      {tech.name}
                    </p>
                    <p
                      className="text-xs mt-1 font-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {tech.category}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="glass-card"
              style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
            >
              <h3
                className="text-base md:text-lg tracking-wider uppercase mb-4 flex items-center gap-2 font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
              >
                <Layers size={16} />
                Architecture
              </h3>
              <div className="space-y-4">
                {spotlightData.architecture.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: 'rgba(255, 215, 0, 0.1)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                      }}
                    >
                      <span
                        className="text-[10px] font-bold"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-gold)' }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <span
                      className="text-sm md:text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <a
                href="https://github.com/YashSomwanshi/Treasure-Collector-Simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon flex-1 justify-center text-center py-3.5 text-sm md:text-base"
              >
                <GitFork size={18} />
                Source Code
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

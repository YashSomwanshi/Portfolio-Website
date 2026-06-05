'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { MapPin, Rocket, Briefcase, Gamepad2 } from 'lucide-react';

const milestones = [
  {
    year: '2024',
    title: 'The Awakening',
    description: 'Started serious programming journey. Mastered core concepts in C++, Python, and data structures.',
    icon: MapPin,
    color: '#00d4ff',
  },
  {
    year: '2025',
    title: 'Full-Stack Quest',
    description: 'Built production-grade full-stack applications including SevaSangam and multiple web platforms.',
    icon: Rocket,
    color: '#b347ea',
  },
  {
    year: '2026',
    title: 'Game Dev Arc',
    description: 'Started game development with Unity and C#. Created Treasure Simulator and explored game design.',
    icon: Gamepad2,
    color: '#ffd700',
  },
  {
    year: 'Future',
    title: 'The Next Level',
    description: 'Seeking game programming opportunities. Ready to contribute to AAA game studios and push boundaries.',
    icon: Briefcase,
    color: '#ff006e',
  },
];

export default function JourneyTimeline() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="experience" className="relative grid-bg overflow-hidden">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">Developer Journey</h2>
          <p className="section-subtitle">{'// PROGRESSION PATH & MILESTONES'}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line - desktop */}
          <div
            className="hidden lg:block absolute top-[60px] left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), rgba(179, 71, 234, 0.3), rgba(255, 215, 0, 0.3), rgba(255, 0, 110, 0.3), transparent)',
            }}
          />

          {/* Vertical line - mobile */}
          <div
            className="lg:hidden absolute top-0 bottom-0 left-8 w-px"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.3), rgba(179, 71, 234, 0.3), transparent)',
            }}
          />

          {/* Desktop: horizontal layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center mb-6 cursor-pointer"
                    style={{
                      background: `radial-gradient(circle, ${milestone.color}15, transparent)`,
                      border: `2px solid ${milestone.color}30`,
                    }}
                  >
                    {/* Outer ring */}
                    <div
                      className="absolute inset-1 rounded-full"
                      style={{ border: `1px solid ${milestone.color}15` }}
                    />
                    <div className="flex flex-col items-center gap-1.5">
                      <Icon size={24} style={{ color: milestone.color }} />
                      <span
                        className="text-sm font-bold font-mono"
                        style={{ color: milestone.color }}
                      >
                        {milestone.year}
                      </span>
                    </div>

                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${milestone.color}` }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3
                    className="text-base md:text-lg font-bold tracking-wider mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: milestone.color }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                  >
                    {milestone.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical layout */}
          <div className="lg:hidden space-y-8">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex gap-6 pl-2"
                >
                  {/* Node */}
                  <div className="relative shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `${milestone.color}15`,
                        border: `2px solid ${milestone.color}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: milestone.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <span
                      className="text-xs font-bold tracking-wider block mb-1"
                      style={{ fontFamily: 'var(--font-mono)', color: milestone.color }}
                    >
                      {milestone.year}
                    </span>
                    <h3
                      className="text-base md:text-lg font-bold tracking-wider mb-1"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                    >
                      {milestone.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                    >
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

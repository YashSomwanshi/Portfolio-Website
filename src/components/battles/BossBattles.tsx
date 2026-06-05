'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks';
import { Cpu, Layers, Gamepad2, GitFork, ExternalLink, Award, Flame } from 'lucide-react';

interface BossBattle {
  id: string;
  name: string;
  difficulty: 'Hard' | 'Extreme' | 'Nightmare';
  challenge: string;
  solution: string;
  outcome: string;
  color: string;
  icon: React.ElementType;
  tech: string[];
  github?: string;
  demo?: string;
  xpReward: number;
  missionId: string;
}

const battles: BossBattle[] = [
  {
    id: 'avatar',
    name: 'AI Avatar Platform',
    difficulty: 'Extreme',
    challenge: 'Building a real-time multilingual communication system combining Speech-to-Text, LLM processing, Text-to-Speech, and avatar synchronization while maintaining low latency.',
    solution: 'Designed a scalable microservice architecture using Node.js, Python, Ollama, and WebSockets. Implemented asynchronous communication and optimized service interactions for real-time performance.',
    outcome: 'Successfully enabled multilingual voice conversations and live avatar interactions with low-latency communication across platforms.',
    color: '#00ffc8', // Neon Cyan
    icon: Cpu,
    tech: ['React', 'Node.js', 'Python', 'WebSockets', 'Ollama', 'STT/TTS'],
    github: 'https://github.com/YashSomwanshi/India-Innovates-2026',
    xpReward: 950,
    missionId: 'MSN-849-AVTR',
  },
  {
    id: 'seva',
    name: 'SevaSangam Platform',
    difficulty: 'Hard',
    challenge: 'Designing a full-stack platform connecting NGOs and donors while handling authentication, item requirements, search functionality, scheduling, and role-based access control.',
    solution: 'Built a scalable architecture using Next.js, TypeScript, MongoDB, and secure authentication. Implemented optimized CRUD operations, dashboards, and scheduling workflows.',
    outcome: 'Delivered a streamlined donation ecosystem that improved NGO-donor coordination and simplified donation management.',
    color: '#b347ea', // Purple
    icon: Layers,
    tech: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'bcrypt'],
    github: 'https://github.com/YashSomwanshi/seva-sangam',
    demo: 'https://seva-sangam.vercel.app/',
    xpReward: 800,
    missionId: 'MSN-204-SEVA',
  },
  {
    id: 'treasure',
    name: 'VR Treasure Collector Simulator',
    difficulty: 'Nightmare',
    challenge: 'Creating immersive VR gameplay with natural XR interactions, collectible systems, score tracking, trigger events, and responsive UI mechanics.',
    solution: 'Developed gameplay systems using Unity 6, XR Interaction Toolkit, XR Device Simulator, and object-oriented C# scripting.',
    outcome: 'Built a complete VR treasure-hunting experience featuring immersive interactions, progression systems, and optimized gameplay flow.',
    color: '#ffd700', // Gold
    icon: Gamepad2,
    tech: ['Unity 6', 'C#', 'XR Interaction Toolkit', 'XR Simulator'],
    github: 'https://github.com/YashSomwanshi/Treasure-Collector-Simulator',
    xpReward: 1200,
    missionId: 'MSN-702-PLAY',
  },
];

const difficultyColors: Record<string, string> = {
  'Hard': '#ff6b35',
  'Extreme': '#ff006e',
  'Nightmare': '#ffd700',
};

function BossCard({ battle, index, isInView }: {
  battle: BossBattle; index: number; isInView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = battle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.6 }}
      className="relative h-full flex flex-col"
    >
      <div
        className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 h-full flex flex-col justify-between border"
        style={{
          background: 'rgba(10, 15, 35, 0.7)',
          borderColor: expanded ? `${battle.color}50` : `${battle.color}15`,
          boxShadow: expanded
            ? `0 0 35px ${battle.color}25, inset 0 0 25px ${battle.color}08`
            : '0 10px 30px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(16px)',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col flex-grow">
          {/* Danger strip */}
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${battle.color}, transparent)`,
            }}
          />

          {/* Dossier Header Info */}
          <div className="flex justify-between items-center" style={{ padding: 'clamp(24px, 4.5vw, 36px) clamp(24px, 4.5vw, 36px) 16px clamp(24px, 4.5vw, 36px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span
              className="text-xs md:text-sm font-mono tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              FILE // {battle.missionId}
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span
                className="text-xs font-bold font-mono tracking-wider"
                style={{ color: '#00ffc8' }}
              >
                STATUS: DEFEATED
              </span>
            </div>
          </div>

          <div className="flex-grow" style={{ padding: 'clamp(24px, 4.5vw, 36px) clamp(24px, 4.5vw, 36px) 0 clamp(24px, 4.5vw, 36px)' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: expanded ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${battle.color}12`,
                    border: `1px solid ${battle.color}25`,
                  }}
                >
                  <Icon size={24} style={{ color: battle.color }} />
                </motion.div>
                <div>
                  <h3
                    className="text-lg md:text-xl font-bold tracking-wider leading-tight"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                  >
                    {battle.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Flame size={12} className="animate-pulse" style={{ color: difficultyColors[battle.difficulty] }} />
                    <span
                      className="text-xs tracking-wider uppercase font-bold"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: difficultyColors[battle.difficulty],
                      }}
                    >
                      {battle.difficulty} CHALLENGE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {battle.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded text-xs tracking-wider font-semibold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Brief Summary */}
            <div className="mb-5">
              <p
                className="text-xs md:text-sm tracking-wider uppercase mb-1.5 font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: battle.color }}
              >
                MISSION GOAL
              </p>
              <p
                className="text-sm md:text-base leading-relaxed text-left"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
              >
                {battle.challenge.slice(0, 105)}...
              </p>
            </div>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4" style={{ padding: '0 clamp(24px, 4.5vw, 36px) 20px clamp(24px, 4.5vw, 36px)' }}>
                <div className="h-px bg-white/5" />

                {/* Challenge */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs md:text-sm" style={{ color: battle.color }}>{`[⚔️]`}</span>
                    <span
                      className="text-xs md:text-sm tracking-wider uppercase font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: battle.color }}
                    >
                      THE CHALLENGE
                    </span>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                  >
                    {battle.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs md:text-sm" style={{ color: battle.color }}>{`[🛡️]`}</span>
                    <span
                      className="text-xs md:text-sm tracking-wider uppercase font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: battle.color }}
                    >
                      THE SOLUTION
                    </span>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                  >
                    {battle.solution}
                  </p>
                </div>

                {/* Outcome */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs md:text-sm" style={{ color: battle.color }}>{`[🏆]`}</span>
                    <span
                      className="text-xs md:text-sm tracking-wider uppercase font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: battle.color }}
                    >
                      MISSION OUTCOME
                    </span>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                  >
                    {battle.outcome}
                  </p>
                </div>

                {/* Dossier CTAs */}
                {(battle.github || battle.demo) && (
                  <div className="flex gap-3 pt-3">
                    {battle.github && (
                      <a
                        href={battle.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-neon flex-1 justify-center py-3 text-sm md:text-base"
                        style={{
                          borderColor: `${battle.color}30`,
                          color: battle.color,
                          background: `${battle.color}05`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitFork size={16} />
                        Source Code
                      </a>
                    )}
                    {battle.demo && (
                      <a
                        href={battle.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-neon flex-1 justify-center py-3 text-sm md:text-base btn-neon-filled"
                        style={{
                          background: `linear-gradient(135deg, ${battle.color}, #000000)`,
                          color: '#ffffff',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Dossier Footer */}
        <div className="flex flex-col gap-3" style={{ padding: '0 clamp(24px, 4.5vw, 36px) clamp(24px, 4.5vw, 36px) clamp(24px, 4.5vw, 36px)' }}>
          <div className="h-px bg-white/5 w-full" />
          <div className="flex items-center justify-between">
            {/* XP Reward counter */}
            <div className="flex items-center gap-1.5">
              <Award size={16} style={{ color: battle.color }} />
              <span
                className="text-xs md:text-sm font-bold font-mono tracking-wider"
                style={{ color: battle.color }}
              >
                REWARD: +{battle.xpReward} XP
              </span>
            </div>

            {/* Expand indicator */}
            <span
              className="text-xs md:text-sm font-mono tracking-widest text-right uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {expanded ? '▲ SECURE FILE' : '▼ EXPAND FILE'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BossBattles() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">Boss Battles</h2>
          <p className="section-subtitle">{'// MAJOR TECHNICAL CHALLENGES CONQUERED'}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {battles.map((battle, i) => (
            <BossCard key={battle.id} battle={battle} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

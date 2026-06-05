'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { Trophy, Shield, Medal, Target, Star, Lock, ExternalLink } from 'lucide-react';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface AchievementLink {
  label: string;
  url: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: Rarity;
  icon: React.ElementType;
  unlocked: boolean;
  date?: string;
  links?: AchievementLink[];
}

const rarityConfig: Record<Rarity, { label: string; color: string; glow: string; bg: string }> = {
  common: { label: 'Common', color: '#8892b0', glow: '0 0 10px rgba(136,146,176,0.3)', bg: 'rgba(136,146,176,0.05)' },
  rare: { label: 'Rare', color: '#00ffc8', glow: '0 0 15px rgba(0,255,200,0.3)', bg: 'rgba(0,255,200,0.05)' },
  epic: { label: 'Epic', color: '#b347ea', glow: '0 0 20px rgba(179,71,234,0.3)', bg: 'rgba(179,71,234,0.05)' },
  legendary: { label: 'Legendary', color: '#ffd700', glow: '0 0 25px rgba(255,215,0,0.3)', bg: 'rgba(255,215,0,0.05)' },
};

const achievements: Achievement[] = [
  {
    id: 'innovates',
    title: 'India Innovates 2026 Finalist',
    description: 'Selected among 6000+ teams for developing a scalable real-world technology solution and advancing to the finalist stage.',
    rarity: 'legendary',
    icon: Trophy,
    unlocked: true,
    date: '2026',
  },
  {
    id: 'copyright',
    title: 'Government Copyright Holder',
    description: 'Received Government of India copyright protection for the SevaSangam platform, recognizing original software development and innovation.',
    rarity: 'legendary',
    icon: Shield,
    unlocked: true,
    date: '2025',
  },
  {
    id: 'bluebit',
    title: 'BlueBit 2026 Finalist',
    description: 'Recognized among the top-performing teams for delivering an innovative and scalable technology solution.',
    rarity: 'epic',
    icon: Medal,
    unlocked: true,
    date: '2026',
  },
  {
    id: 'dsa',
    title: '225+ DSA Problems Solved',
    description: 'Solved over 225 coding problems covering data structures, algorithms, problem solving, and competitive programming concepts.',
    rarity: 'rare',
    icon: Target,
    unlocked: true,
    date: 'Ongoing',
    links: [
      { label: 'LeetCode', url: 'https://leetcode.com/u/Yash9321/' }
    ]
  },
  {
    id: 'competitive',
    title: 'Competitive Programmer',
    description: 'Achieved a 2★ rating on CodeChef and actively participated in competitive programming contests to strengthen algorithmic thinking.',
    rarity: 'rare',
    icon: Star,
    unlocked: true,
    date: 'Ongoing',
    links: [
      { label: 'CodeChef', url: 'https://www.codechef.com/users/alwanod' },
      { label: 'Codeforces', url: 'https://codeforces.com/profile/alwanod1' }
    ]
  },
];

function AchievementCard({ achievement, index, isInView }: {
  achievement: Achievement; index: number; isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const rarity = rarityConfig[achievement.rarity];
  
  useEffect(() => {
    if (isInView && !isUnlocked) {
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
        setIsUnlocked(true);
      }, 1000 + index * 300); // staggered scanning & unlock animation
      return () => clearTimeout(timer);
    }
  }, [isInView, index, isUnlocked]);

  // Use Lock icon when scanning/locked, and real icon when unlocked
  const Icon = isUnlocked ? achievement.icon : Lock;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        borderColor: hovered 
          ? `${rarity.color}ee` 
          : [`${rarity.color}25`, `${rarity.color}50`, `${rarity.color}25`],
        boxShadow: hovered 
          ? `0 0 25px ${rarity.color}40, inset 0 0 15px ${rarity.color}15` 
          : [`0 0 12px ${rarity.color}08`, `0 0 22px ${rarity.color}20`, `0 0 12px ${rarity.color}08`],
      } : {}}
      transition={{
        opacity: { delay: 0.1 * index, duration: 0.5 },
        y: { delay: 0.1 * index, duration: 0.5 },
        scale: { delay: 0.1 * index, duration: 0.5 },
        borderColor: hovered ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        boxShadow: hovered ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer h-full flex flex-col"
      style={{
        background: hovered ? rarity.bg : 'rgba(15, 20, 50, 0.4)',
        border: '1px solid', // border color is animated by framer-motion
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Laser scanline overlay */}
      {isScanning && (
        <motion.div
          className="absolute left-0 right-0 h-0.5 pointer-events-none z-20"
          style={{ background: rarity.color, boxShadow: `0 0 10px ${rarity.color}` }}
          initial={{ top: '0%' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Rarity indicator strip */}
      <div
        className="h-1 w-full"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${rarity.color}, transparent)`,
          opacity: isUnlocked ? 1 : 0.2
        }}
      />

      <div className="flex flex-col justify-between flex-grow h-full" style={{ padding: 'clamp(24px, 4.5vw, 36px)' }}>
        <div className="flex flex-col flex-grow">
          {/* Icon and rarity badge */}
          <div className="flex items-start justify-between mb-5">
            <motion.div
              animate={hovered && isUnlocked ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: isUnlocked ? `${rarity.color}15` : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${isUnlocked ? `${rarity.color}30` : 'rgba(255, 255, 255, 0.08)'}`,
              }}
            >
              <Icon size={24} style={{ color: isUnlocked ? rarity.color : 'var(--text-muted)' }} />
            </motion.div>

            <span
              className="px-3 py-1 rounded text-[10px] md:text-xs tracking-wider uppercase font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                background: isUnlocked ? `${rarity.color}15` : 'rgba(255, 255, 255, 0.03)',
                color: isUnlocked ? rarity.color : 'var(--text-muted)',
                border: `1px solid ${isUnlocked ? `${rarity.color}25` : 'rgba(255, 255, 255, 0.08)'}`,
              }}
            >
              {isUnlocked ? rarity.label : 'ENCRYPTED'}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg md:text-xl font-bold mb-3 tracking-wide"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isUnlocked ? (hovered ? rarity.color : 'var(--text-primary)') : 'var(--text-muted)',
              transition: 'color 0.3s',
            }}
          >
            {isUnlocked ? achievement.title : 'SYS.DATA // LOCKED'}
          </h3>

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed mb-5"
            style={{ 
              fontFamily: 'var(--font-body)', 
              color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)', 
              opacity: isUnlocked ? 0.85 : 0.4 
            }}
          >
            {isUnlocked ? achievement.description : 'Unlock this node by completing key software architecture and programming milestones.'}
          </p>

          {/* Profile Links if available */}
          {isUnlocked && achievement.links && achievement.links.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {achievement.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs tracking-wider font-semibold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = rarity.color;
                    e.currentTarget.style.borderColor = `${rarity.color}30`;
                    e.currentTarget.style.background = `${rarity.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.label}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-3" style={{ borderTop: isUnlocked ? '1px solid rgba(255, 255, 255, 0.03)' : 'none' }}>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                background: isUnlocked ? '#00ffc8' : 'rgba(255, 0, 110, 0.6)',
                boxShadow: isUnlocked ? '0 0 10px rgba(0,255,200,0.6)' : 'none',
              }}
            />
            <span
              className="text-[10px] md:text-xs tracking-wider uppercase font-bold"
              style={{ 
                fontFamily: 'var(--font-mono)', 
                color: isUnlocked ? '#00ffc8' : 'rgba(255, 0, 110, 0.6)' 
              }}
            >
              {isScanning ? 'DECRYPTING...' : (isUnlocked ? 'SECURED' : 'LOCKED')}
            </span>
          </div>
          {achievement.date && isUnlocked && (
            <span
              className="text-[10px] md:text-xs tracking-wider font-mono font-bold"
              style={{ color: 'var(--text-muted)' }}
            >
              {achievement.date}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementSystem() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="achievements" className="relative grid-bg">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">{'// UNLOCKED MILESTONES & ACCOMPLISHMENTS'}</p>
        </motion.div>

        {/* Achievement progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden relative"
          style={{ 
            marginBottom: '56px',
            padding: '28px 32px',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.08), inset 0 0 20px rgba(0, 212, 255, 0.04)'
          }}
        >
          {/* Tech lines background decoration */}
          <div className="absolute top-0 right-0 w-24 h-full pointer-events-none opacity-20 border-l border-t border-cyan-500/30 bg-[linear-gradient(45deg,transparent_45%,rgba(0,212,255,0.1)_50%,transparent_55%)] bg-[size:10px_10px]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span
                  className="text-xs font-mono tracking-widest"
                  style={{ color: 'var(--neon-cyan)' }}
                >
                  SYSTEM PROGRESS // MILESTONES
                </span>
              </div>
              <h3
                className="text-base md:text-lg font-bold tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                Developer Achievement Level
              </h3>
            </div>
            
            <div className="flex items-baseline gap-2 self-start md:self-auto">
              <span
                className="text-2xl md:text-3xl font-extrabold tracking-widest font-mono"
                style={{ 
                  color: 'var(--neon-cyan)',
                  textShadow: '0 0 15px rgba(0, 255, 200, 0.6)'
                }}
              >
                5
              </span>
              <span className="text-sm text-muted" style={{ color: 'var(--text-muted)' }}>/</span>
              <span className="text-base text-secondary font-mono" style={{ color: 'var(--text-secondary)' }}>5 SECURED</span>
            </div>
          </div>

          <div className="relative">
            {/* The Bar */}
            <div className="h-5 rounded-md overflow-hidden relative border border-cyan-500/30" style={{ background: 'rgba(0, 212, 255, 0.04)' }}>
              {/* Grid segments overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none flex justify-between">
                {Array(10).fill(null).map((_, idx) => (
                  <div key={idx} className="w-px h-full bg-black/40" />
                ))}
              </div>
              
              {/* Filled progress motion div */}
              <motion.div
                className="h-full rounded-l-sm relative"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ delay: 0.4, duration: 1.5, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple), var(--neon-cyan))',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
                }}
              >
                {/* Diagonal scanning light line inside the filled progress bar */}
                <motion.div
                  className="absolute top-0 bottom-0 w-12 bg-white/25 skew-x-12"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
            
            {/* Progress stats footer */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                CORE STATUS: MAXIMUM PROGRESS UNLOCKED
              </span>
              <span className="text-[10px] font-mono tracking-wider" style={{ color: 'var(--neon-cyan)' }}>
                100% COMPLETE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Achievement grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

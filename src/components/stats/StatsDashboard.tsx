'use client';

import { motion } from 'framer-motion';
import { useInView, useCountUp } from '@/hooks';
import { FolderGit2, Code, GitFork, Clock, Target } from 'lucide-react';

const statistics = [
  { label: 'Projects Completed', value: 8, suffix: '+', icon: FolderGit2, color: '#00d4ff' },
  { label: 'Technologies Learned', value: 15, suffix: '+', icon: Code, color: '#b347ea' },
  { label: 'GitHub Repositories', value: 12, suffix: '+', icon: GitFork, color: '#00ffc8' },
  { label: 'Coding Hours', value: 1500, suffix: '+', icon: Clock, color: '#ffd700' },
  { label: 'Problems Solved', value: 350, suffix: '+', icon: Target, color: '#ff006e' },
];

function StatCard({ stat, index, isInView }: {
  stat: typeof statistics[0]; index: number; isInView: boolean;
}) {
  const count = useCountUp(stat.value, 2000, 0, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="relative glass-card text-center group overflow-hidden"
      style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${stat.color}10`,
            border: `1px solid ${stat.color}25`,
          }}
        >
          <Icon size={22} style={{ color: stat.color }} />
        </div>

        <div className="mb-2">
          <span
            className="text-3xl font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: stat.color,
              textShadow: `0 0 20px ${stat.color}40`,
            }}
          >
            {count.toLocaleString()}
          </span>
          <span
            className="text-lg"
            style={{ fontFamily: 'var(--font-heading)', color: stat.color }}
          >
            {stat.suffix}
          </span>
        </div>

        <p
          className="text-xs tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsDashboard() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="relative grid-bg">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">Live Statistics</h2>
          <p className="section-subtitle">{'// REAL-TIME ANALYTICS DASHBOARD'}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statistics.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Dashboard visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-card"
          style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-sm tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
            >
              Skill Distribution
            </h3>
            <span
              className="text-[10px] tracking-wider"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              STATUS: ACTIVE // LIVE
            </span>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-3 h-40">
            {[
              { label: 'C++', value: 90, color: '#00d4ff' },
              { label: 'React.js', value: 80, color: '#b347ea' },
              { label: 'Node.js', value: 78, color: '#b347ea' },
              { label: 'Python', value: 75, color: '#00d4ff' },
              { label: 'Unity', value: 72, color: '#ffd700' },
              { label: 'Unreal Engine', value: 70, color: '#ffd700' },
            ].map((bar, i) => (
              <div key={bar.label} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                <div className="relative w-full h-32 flex items-end">
                  <motion.div
                    className="relative w-full rounded-t-md group cursor-pointer"
                    initial={{ height: '0%' }}
                    animate={isInView ? { height: `${bar.value}%` } : { height: '0%' }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    style={{
                      background: `linear-gradient(180deg, ${bar.color}, ${bar.color}40)`,
                      boxShadow: `0 0 10px ${bar.color}20`,
                      minHeight: isInView ? '10px' : '0',
                    }}
                  >
                    {/* Floating Tooltip */}
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-950 border text-xs font-mono font-bold rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 pointer-events-none whitespace-nowrap z-30"
                      style={{
                        borderColor: `${bar.color}60`,
                        color: bar.color,
                        boxShadow: `0 0 15px ${bar.color}30`,
                      }}
                    >
                      LV.{bar.value}
                    </div>
                  </motion.div>
                </div>
                <span
                  className="text-[9px] tracking-wider text-center"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

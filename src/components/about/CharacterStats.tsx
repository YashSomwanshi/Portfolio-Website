'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView, useCountUp } from '@/hooks';
import { Shield, Code, Brain, Gamepad2, Link2, Mail, Phone } from 'lucide-react';

export const stats = [
  { name: 'Programming', value: 85, icon: Code, color: '#00d4ff' },
  { name: 'Problem Solving', value: 80, icon: Brain, color: '#b347ea' },
  { name: 'Web Development', value: 85, icon: Shield, color: '#00ffc8' },
  { name: 'Game Development', value: 72, icon: Gamepad2, color: '#ffd700' },
];

export const coreProficiencies = [
  { label: 'Backend', value: 85, color: '#00d4ff' },
  { label: 'Frontend', value: 80, color: '#b347ea' },
  { label: 'Game Dev', value: 72, color: '#ffd700' },
];

function StatBar({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) {
  const count = useCountUp(stat.value, 1500, 0, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="flex items-center gap-4 group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${stat.color}10`,
          border: `1px solid ${stat.color}30`,
        }}
      >
        <stat.icon size={18} style={{ color: stat.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-base font-bold tracking-wider"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {stat.name}
          </span>
          <span
            className="text-base font-bold font-mono"
            style={{ color: stat.color }}
          >
            {count}
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: `${stat.color}15` }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${stat.value}%` } : { width: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 1.2, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${stat.color}80, ${stat.color})`,
              boxShadow: `0 0 10px ${stat.color}40`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function CircularMeter({ value, label, color, size = 100, isInView }: {
  value: number; label: string; color: string; size?: number; isInView: boolean;
}) {
  const count = useCountUp(value, 1500, 0, isInView);
  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (circumference * value) / 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke={`${color}15`} strokeWidth="4" />
          <motion.circle
            cx="50" cy="50" r="38"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl font-bold font-mono"
            style={{ color }}
          >
            {count}
          </span>
        </div>
      </div>
      <span
        className="text-xs tracking-wider uppercase text-center font-bold"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CharacterStats() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="about" className="relative grid-bg">
      <div ref={ref} className="section-container animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-divider" />
          <h2 className="section-title">Character Profile</h2>
          <p className="section-subtitle">{'// RPG-STYLE STATS OVERVIEW'}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Portrait & Profile Card (Focal Point) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card hud-corner lg:col-span-4 flex flex-col gap-6 h-full"
            style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
          >
            {/* Image Container with Float Animation */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-[240px] self-center aspect-[3/4] rounded-xl overflow-hidden flex items-end justify-center glass-card shadow-[0_0_25px_rgba(0,212,255,0.15)] border border-[rgba(0,212,255,0.25)] cursor-pointer"
            >
              <img
                src="/profile.png"
                alt="Yash Somwanshi Portrait"
                className="w-[90%] h-[90%] object-cover object-center mx-auto transition-transform duration-500 hover:scale-105"
              />
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%]" />
              {/* Tech details */}
              <div className="absolute top-3 left-3 text-[8px] font-mono tracking-widest text-neon-blue/60">SYS.ID // 849-B</div>
              <div className="absolute bottom-3 right-3 text-[8px] font-mono tracking-widest text-neon-cyan/60">LIVE // SECURE</div>
            </motion.div>

            {/* Profile Info */}
            <div>
              <h3
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Yash Somwanshi
              </h3>
              <p
                className="text-sm font-bold tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}
              >
                IT Engineer | Full Stack Developer | Aspiring Game Programmer
              </p>

              <div className="h-px bg-gradient-to-r from-[rgba(0,212,255,0.2)] via-[rgba(179,71,234,0.1)] to-transparent mb-4" />

              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85, lineHeight: 1.8 }}
              >
                A passionate developer focused on building scalable web applications, interactive software systems, and immersive gaming experiences. Continuously learning new technologies and solving real-world problems through code.
              </p>

              <div className="h-px bg-gradient-to-r from-[rgba(0,212,255,0.2)] via-[rgba(179,71,234,0.1)] to-transparent my-4" />

              {/* Character Contact Info (Horizontal Icons only) */}
              <div className="flex items-center gap-3 mt-4">
                {[
                  { icon: Code, label: 'GitHub', url: 'https://github.com/YashSomwanshi', color: '#00d4ff' },
                  { icon: Link2, label: 'LinkedIn', url: 'https://www.linkedin.com/in/yash-somwanshi-3670b2292/', color: '#b347ea' },
                  { icon: Mail, label: 'Email', url: 'mailto:somwanshiyash14@gmail.com', color: '#00ffc8' },
                  { icon: Phone, label: 'Mobile', url: 'tel:+919175973084', color: '#ffd700' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      title={item.label}
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border"
                      style={{
                        background: `${item.color}08`,
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${item.color}40`;
                        e.currentTarget.style.background = `${item.color}15`;
                        e.currentTarget.style.boxShadow = `0 0 12px ${item.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.background = `${item.color}08`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Stats, Proficiencies & Abilities (Technical Overview) */}
          <div className="lg:col-span-8 flex flex-col gap-6 h-full">
            {/* Skill Bars Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card flex-1 flex flex-col justify-center"
              style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
            >
              <h4
                className="text-sm tracking-wider uppercase mb-5 font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
              >
                Skill Ratings
              </h4>
              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <StatBar key={stat.name} stat={stat} index={i} isInView={isInView} />
                ))}
              </div>
            </motion.div>

            {/* Core Proficiency Circles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card flex-1 flex flex-col justify-center"
              style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
            >
              <h4
                className="text-sm tracking-wider uppercase mb-5 font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
              >
                Core Proficiency
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {coreProficiencies.map((prof) => (
                  <CircularMeter
                    key={prof.label}
                    value={prof.value}
                    label={prof.label}
                    color={prof.color}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>

            {/* Info Cards and Active Abilities Grid */}
            <div className="grid md:grid-cols-12 gap-6 items-stretch flex-1">
              {/* Info Cards */}
              <div className="md:col-span-5 grid grid-cols-2 gap-3">
                {[
                  { label: 'Specialty', value: 'Full Stack Development', color: '#00d4ff' },
                  { label: 'Weapon', value: 'C++', color: '#b347ea' },
                  { label: 'Quest', value: 'AAA Games', color: '#00ffc8' },
                  { label: 'Guild', value: 'Open Source', color: '#ffd700' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="glass-card text-center flex flex-col justify-center items-center"
                    style={{ padding: '16px 12px' }}
                  >
                    <p
                      className="text-[10px] tracking-wider uppercase mb-1 font-bold"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-bold leading-tight"
                      style={{ fontFamily: 'var(--font-heading)', color: item.color }}
                    >
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Active Abilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="glass-card md:col-span-7 flex flex-col justify-between"
                style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}
              >
                <h4
                  className="text-sm tracking-wider uppercase mb-4 font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
                >
                  Active Abilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Full Stack Development',
                    'Backend Architecture',
                    'Frontend Development',
                    'Database Design',
                    'REST APIs',
                    'Game Development',
                    'Problem Solving',
                    'Team Collaboration',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded text-xs tracking-wider font-semibold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(0, 212, 255, 0.05)',
                        border: '1px solid rgba(0, 212, 255, 0.15)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

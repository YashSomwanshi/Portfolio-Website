'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { Sword, Wrench, Cpu } from 'lucide-react';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface TechItem {
  name: string;
  rarity: Rarity;
  description: string;
}

interface ArsenalCategory {
  name: string;
  icon: React.ElementType;
  color: string;
  items: TechItem[];
}

const rarityStyles: Record<Rarity, { label: string; border: string; glow: string; textColor: string }> = {
  common: { label: 'Common', border: 'rgba(136,146,176,0.3)', glow: 'none', textColor: '#8892b0' },
  rare: { label: 'Rare', border: 'rgba(0,212,255,0.4)', glow: '0 0 15px rgba(0,212,255,0.2)', textColor: '#00d4ff' },
  epic: { label: 'Epic', border: 'rgba(179,71,234,0.4)', glow: '0 0 20px rgba(179,71,234,0.2)', textColor: '#b347ea' },
  legendary: { label: 'Legendary', border: 'rgba(255,215,0,0.5)', glow: '0 0 25px rgba(255,215,0,0.2)', textColor: '#ffd700' },
};

const arsenal: ArsenalCategory[] = [
  {
    name: 'Weapons',
    icon: Sword,
    color: '#ff006e',
    items: [
      { name: 'C++', rarity: 'legendary', description: 'Primary weapon. Low-level performance, memory management, OOP, and native engine architecture.' },
      { name: 'Python', rarity: 'epic', description: 'Versatile tool for AI/ML, scripting, and rapid prototyping.' },
      { name: 'C#', rarity: 'rare', description: 'Unity scripting, gameplay loops, component lifecycle, and event scripting.' },
    ],
  },
  {
    name: 'Tools',
    icon: Wrench,
    color: '#00d4ff',
    items: [
      { name: 'Git', rarity: 'epic', description: 'Version control mastery, branching strategies, collaborative workflows.' },
      { name: 'MongoDB', rarity: 'rare', description: 'NoSQL database design, aggregation pipelines, schema optimization.' },
      { name: 'Node.js', rarity: 'epic', description: 'Server-side JavaScript, REST APIs, real-time applications.' },
      { name: 'Express.js', rarity: 'rare', description: 'Backend framework for building scalable web applications.' },
    ],
  },
  {
    name: 'Engines',
    icon: Cpu,
    color: '#ffd700',
    items: [
      { name: 'Unity', rarity: 'epic', description: 'Game engine for 2D/3D game development, physics, and shaders.' },
      { name: 'Unreal Engine', rarity: 'rare', description: 'Currently learning. Exploring Blueprints and C++ game development.' },
    ],
  },
];

function TechCard({ item, index, isInView }: { item: TechItem; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const rarity = rarityStyles[item.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer group h-full"
      style={{ perspective: '800px' }}
    >
      <motion.div
        animate={{ rotateY: hovered ? 5 : 0, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl overflow-hidden h-full flex flex-col"
        style={{
          padding: 'clamp(24px, 4.5vw, 36px)',
          background: hovered ? 'rgba(15, 20, 50, 0.6)' : 'rgba(15, 20, 50, 0.35)',
          border: `1px solid ${hovered ? rarity.border : 'rgba(0, 212, 255, 0.08)'}`,
          boxShadow: hovered ? rarity.glow : 'none',
          backdropFilter: 'blur(8px)',
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Rarity strip */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${rarity.textColor}, transparent)`,
            opacity: hovered ? 1 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Content */}
        <div className="flex items-start justify-between mb-4">
          <h4
            className="text-lg md:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'var(--font-heading)',
              color: hovered ? rarity.textColor : 'var(--text-primary)',
              transition: 'color 0.3s',
            }}
          >
            {item.name}
          </h4>
          <span
            className="px-2.5 py-1 rounded text-[10px] md:text-xs tracking-wider uppercase font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              background: `${rarity.textColor}15`,
              color: rarity.textColor,
              border: `1px solid ${rarity.textColor}25`,
            }}
          >
            {rarity.label}
          </span>
        </div>

        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
        >
          {item.description}
        </p>

        {/* Corner decorations */}
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r opacity-20" style={{ borderColor: rarity.textColor }} />
      </motion.div>
    </motion.div>
  );
}

export default function TechArsenal() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">Technology Arsenal</h2>
          <p className="section-subtitle">{'// COLLECTIBLE TECH CARDS & EQUIPMENT'}</p>
        </motion.div>

        <div className="space-y-12">
          {arsenal.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * catIndex }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${category.color}15`,
                      border: `1px solid ${category.color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: category.color }} />
                  </div>
                  <h3
                    className="text-base tracking-wider uppercase font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: category.color }}
                  >
                    {category.name}
                  </h3>
                  <div className="h-px flex-1" style={{ background: `${category.color}15` }} />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.items.map((item, i) => (
                    <TechCard key={item.name} item={item} index={catIndex * 4 + i} isInView={isInView} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks';
import { Code, Globe, Cpu, Layers, Gamepad2, ChevronDown } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  description: string;
  isStandout?: boolean;
  icon?: React.ElementType;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: 'programming',
    name: 'Programming',
    icon: Code,
    color: '#00d4ff',
    skills: [
      { name: 'C++', level: 90, description: 'Low-level performance, memory management, templates, OOP, game architecture', isStandout: true, icon: Code },
      { name: 'Python', level: 75, description: 'Scripting, automation, data processing, AI tools testing', icon: Code },
      { name: 'Java', level: 70, description: 'Cross-platform apps, enterprise OOP patterns, robust data structures', icon: Code },
      { name: 'JavaScript', level: 75, description: 'Web ecosystems, asynchronous event-driven logic, ES6+', icon: Code },
    ],
  },
  {
    id: 'webdev',
    name: 'Web Development',
    icon: Globe,
    color: '#b347ea',
    skills: [
      { name: 'HTML/CSS', level: 85, description: 'Semantic markup, layout systems (Flex/Grid), custom variables', icon: Globe },
      { name: 'JavaScript', level: 75, description: 'Frontend interactions, DOM manipulation, state logic', icon: Code },
      { name: 'React.js', level: 80, description: 'Component lifecycle, hooks, context API, state managers', icon: Globe },
      { name: 'Next.js', level: 75, description: 'App router, server components, SSG/SSR optimization', icon: Globe },
      { name: 'Node.js', level: 78, description: 'Server runtime environment, file handling, npm tooling', icon: Cpu },
      { name: 'Express.js', level: 75, description: 'Middleware routing, payload handling, endpoint exposure', icon: Code },
      { name: 'MongoDB', level: 72, description: 'Document stores, flexible schemas, indexing, aggregation', icon: Layers },
      { name: 'MySQL', level: 75, description: 'Relational design, indexing, custom query authoring', icon: Layers },
      { name: 'PostgreSQL', level: 70, description: 'ACID transactions, complex relations, structured storage', icon: Layers },
    ],
  },
  {
    id: 'gamedev',
    name: 'Game Development',
    icon: Gamepad2,
    color: '#ffd700',
    skills: [
      { name: 'Unity', level: 72, description: 'Component pipelines, physics loops, custom editor extensions', icon: Gamepad2 },
      { name: 'Unreal Engine', level: 70, description: 'Engine lifecycle, landscape design, materials, visual effects', icon: Cpu },
      { name: 'C++', level: 85, description: 'Native scripts, performance profiling, direct memory allocation', icon: Code },
      { name: 'Blueprints', level: 70, description: 'Nodes structure, event dispatchers, rapid logic prototype', icon: Layers },
      { name: 'Game Design', level: 70, description: 'System loops, balancing player agency, progression paths', icon: Gamepad2 },
      { name: 'C#', level: 70, description: 'C# scripting, lifecycle callbacks, Unity package integration', icon: Code },
    ],
  },
];

function SkillNode({ skill, color, index }: { 
  skill: Skill; color: string; index: number; 
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative cursor-pointer transition-all duration-300 rounded-xl"
        style={{
          padding: '18px 22px',
          background: hovered 
            ? `${color}15` 
            : (skill.isStandout ? `${color}08` : 'rgba(15, 20, 50, 0.4)'),
          border: `1px solid ${hovered 
            ? `${color}50` 
            : (skill.isStandout ? `${color}40` : `${color}15`)
          }`,
          boxShadow: hovered 
            ? `0 0 25px ${color}25, inset 0 0 20px ${color}10` 
            : (skill.isStandout ? `0 0 15px ${color}20, inset 0 0 15px ${color}05` : 'none'),
        }}
      >
        {/* Skill name and level */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {skill.icon && <skill.icon size={16} className="shrink-0" style={{ color }} />}
            <span
              className="text-base font-bold tracking-wider"
              style={{ fontFamily: 'var(--font-heading)', color: hovered ? color : 'var(--text-primary)' }}
            >
              {skill.name}
            </span>
          </div>
          <span
            className="text-sm font-bold font-mono"
            style={{ color }}
          >
            LV.{skill.level}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: `${color}15` }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${color}80, ${color})`,
              boxShadow: `0 0 8px ${color}40`,
            }}
          />
        </div>

        {/* Description / Details */}
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 0.85, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm leading-relaxed mt-2.5"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', lineHeight: 1.6 }}
            >
              {skill.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Glowing borders for Standout skill */}
        {skill.isStandout && (
          <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow border border-dashed border-neon-blue/30" />
        )}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: `${color}30` }} />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: `${color}30` }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: `${color}30` }} />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: `${color}30` }} />
      </div>
    </motion.div>
  );
}

export default function SkillTree() {
  const { ref, isInView } = useInView(0.1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('programming');

  return (
    <section id="skills" className="relative">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-divider" />
          <h2 className="section-title">Skill Tree</h2>
          <p className="section-subtitle">{'// INTERACTIVE ABILITY MAP'}</p>
        </motion.div>

        {/* Desktop Layout (side-by-side) */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Category selector */}
          <div className="space-y-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isExpanded = expandedCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                  className="w-full flex items-center gap-4 rounded-xl text-left transition-all duration-300 cursor-pointer"
                  style={{
                    padding: '16px 20px',
                    background: isExpanded ? `${cat.color}10` : 'rgba(15, 20, 50, 0.3)',
                    border: `1px solid ${isExpanded ? `${cat.color}30` : 'rgba(0, 212, 255, 0.05)'}`,
                    boxShadow: isExpanded ? `0 0 20px ${cat.color}10` : 'none',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `${cat.color}15`,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-base font-bold tracking-wider block"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isExpanded ? cat.color : 'var(--text-primary)',
                      }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="text-sm font-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {cat.skills.length} skills
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className="transition-transform duration-300"
                    style={{
                      color: 'var(--text-muted)',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Skills display card (Dynamic Height - no fixed min-height) */}
          <div className="glass-card flex flex-col" style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
            <AnimatePresence mode="wait">
              {expandedCategory && (
                <motion.div
                  key={expandedCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col"
                >
                  {(() => {
                    const cat = categories.find(c => c.id === expandedCategory);
                    if (!cat) return null;

                    return (
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-6" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                            <cat.icon size={24} style={{ color: cat.color }} />
                            <h3
                              className="text-xl md:text-2xl font-bold tracking-wider"
                              style={{ fontFamily: 'var(--font-heading)', color: cat.color }}
                            >
                              {cat.name}
                            </h3>
                            <div className="h-px flex-1 bg-transparent" />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            {cat.skills.map((skill, idx) => (
                              <SkillNode
                                key={skill.name}
                                skill={skill}
                                color={cat.color}
                                index={idx}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {!expandedCategory && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex items-center justify-center py-12"
                >
                  <p
                    className="text-base tracking-wider font-mono"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {'> SELECT A SKILL BRANCH TO EXPLORE'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile/Tablet Layout (True accordions) */}
        <div className="lg:hidden space-y-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isExpanded = expandedCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="rounded-xl overflow-hidden border transition-all duration-300"
                style={{
                  background: 'rgba(15, 20, 50, 0.25)',
                  borderColor: isExpanded ? `${cat.color}30` : 'rgba(0, 212, 255, 0.05)',
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                  className="w-full flex items-center gap-4 text-left transition-all duration-300"
                  style={{
                    padding: '16px 20px',
                    background: isExpanded ? `${cat.color}05` : 'transparent',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `${cat.color}15`,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-base font-bold tracking-wider block"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isExpanded ? cat.color : 'var(--text-primary)',
                      }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="text-sm font-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {cat.skills.length} skills
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className="transition-transform duration-300"
                    style={{
                      color: 'var(--text-muted)',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-[rgba(0,212,255,0.05)] bg-[rgba(5,8,22,0.4)]" style={{ padding: '20px' }}>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {cat.skills.map((skill, idx) => (
                            <SkillNode
                              key={skill.name}
                              skill={skill}
                              color={cat.color}
                              index={idx}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

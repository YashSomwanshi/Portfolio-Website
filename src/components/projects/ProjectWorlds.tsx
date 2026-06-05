'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { ExternalLink, GitFork, Cpu, Layers, Zap } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  challenges: string[];
  github?: string;
  demo?: string;
  color: string;
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: 'treasure',
    title: 'VR Treasure Collector Simulator',
    subtitle: 'VR Interaction Sandbox',
    description: 'An immersive VR treasure-hunting experience in Unity using XR Interaction Toolkit. Scripted physical item interaction, score mechanics, triggers, and game loops.',
    tech: ['Unity 6', 'C#', 'XR Interaction Toolkit', 'XR Simulator'],
    features: ['VR Locomotion & Navigation', 'Physics-based item collection', 'Trigger event scripting', 'Win-condition validation'],
    challenges: ['XR Controller mapping integration', 'Rigid body interaction physics', 'State-based game loop management'],
    github: 'https://github.com/YashSomwanshi/Treasure-Collector-Simulator',
    color: '#ffd700',
    icon: Zap,
  },
  {
    id: 'avatar',
    title: 'AI Avatar Platform',
    subtitle: 'Multilingual Civic System',
    description: 'A multilingual AI avatar platform with real-time Speech-to-Text, LLM, and Text-to-Speech pipeline supporting voice conversations in 6 Indian languages.',
    tech: ['React', 'Node.js', 'Python', 'WebSocket', 'Ollama'],
    features: ['Speech-to-Text & TTS pipeline', 'WebSocket-based low latency', '3D avatar interaction modules', 'Broadcast system notifications'],
    challenges: ['Multi-model pipeline latency', 'Microservice voice synchronization', 'Cross-platform package modules'],
    github: 'https://github.com/YashSomwanshi/India-Innovates-2026',
    color: '#b347ea',
    icon: Cpu,
  },
  {
    id: 'seva',
    title: 'SevaSangam',
    subtitle: 'NGO Donor Connection Platform',
    description: 'A copyrighted full-stack donation platform connecting NGOs with donors, featuring role-based dashboards, secure auth, and Next.js server actions.',
    tech: ['Next.js', 'React', 'TypeScript', 'MongoDB'],
    features: ['Role-based secured routing', 'Urgent needs carousel', 'Next.js server action CRUDs', 'Donor leaderboard pipelines'],
    challenges: ['Dual delivery scheduling flow', 'Secure bcrypt authentication', 'Coordination boilerplate reduction'],
    github: 'https://github.com/YashSomwanshi/seva-sangam',
    demo: 'https://seva-sangam.vercel.app/',
    color: '#00ffc8',
    icon: Layers,
  },
];

function ProjectCard({ project, index, isInView }: {
  project: Project; index: number; isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group h-full flex flex-col"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{
          rotateY: hovered ? 2 : 0,
          rotateX: hovered ? -2 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl overflow-hidden h-full flex flex-col justify-between"
        style={{
          background: 'rgba(15, 20, 50, 0.5)',
          border: `1px solid ${hovered ? `${project.color}40` : `${project.color}10`}`,
          boxShadow: hovered ? `0 20px 60px ${project.color}15, 0 0 30px ${project.color}08` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex flex-col flex-grow">
          {/* Top accent bar */}
          <div
            className="h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              opacity: hovered ? 1 : 0.5,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Header */}
          <div style={{ padding: 'clamp(20px, 3.5vw, 32px) clamp(20px, 3.5vw, 32px) 0 clamp(20px, 3.5vw, 32px)' }}>
            <div className="flex items-start justify-between mb-4">
              <motion.div
                animate={hovered ? { scale: 1.1 } : { scale: 1 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: `${project.color}12`,
                  border: `1px solid ${project.color}25`,
                }}
              >
                <Icon size={24} style={{ color: project.color }} />
              </motion.div>

              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(0, 212, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.15)',
                      color: 'var(--text-secondary)',
                    }}
                    aria-label={`${project.title} GitHub`}
                  >
                    <GitFork size={16} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: `${project.color}10`,
                      border: `1px solid ${project.color}20`,
                      color: project.color,
                    }}
                    aria-label={`${project.title} Live Demo`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-mono)', color: project.color }}
            >
              {project.subtitle}
            </p>
            <h3
              className="text-xl font-bold mb-3 tracking-wider"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>

          {/* Features */}
          <div style={{ padding: '0 clamp(20px, 3.5vw, 32px)', marginBottom: '24px' }}>
            <p
              className="text-[10px] tracking-wider uppercase mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}
            >
              Key Features
            </p>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: project.color }} />
                  <span
                    className="text-xs"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', opacity: 0.85 }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ padding: '0 clamp(20px, 3.5vw, 32px) clamp(20px, 3.5vw, 32px) clamp(20px, 3.5vw, 32px)' }}>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-[10px] tracking-wider"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: `${project.color}08`,
                  border: `1px solid ${project.color}20`,
                  color: project.color,
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectWorlds() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="projects" className="relative">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">Project Worlds</h2>
          <p className="section-subtitle">{'// EXPLORE THE DIGITAL REALMS I\'VE CREATED'}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

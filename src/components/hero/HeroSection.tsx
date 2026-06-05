'use client';

import { motion } from 'framer-motion';
import { useTypingEffect, useMousePosition } from '@/hooks';
import Starfield from './Starfield';
import FloatingElements from './FloatingElements';
import { ArrowDown, Download, FolderOpen, Send } from 'lucide-react';

const titles = ['Game Programmer', 'Software Developer'];

export default function HeroSection() {
  const displayText = useTypingEffect(titles, 80, 40, 2000);
  const { position } = useMousePosition();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.03), transparent 70%)' }} />
      <Starfield />
      <FloatingElements />

      {/* Mouse-following glow */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: position.x - 200,
          top: position.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, rgba(179, 71, 234, 0.03) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: 'rgba(0, 212, 255, 0.05)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon-cyan)' }} />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}
          >
            Available for Opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
          >
            Welcome to My Universe
          </p>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #ffffff 0%, var(--neon-blue) 50%, var(--neon-purple) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            YASH
            <br />
            SOMWANSHI
          </h1>
        </motion.div>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="h-10 flex items-center justify-center mb-8"
        >
          <span
            className="text-xl md:text-2xl tracking-wider"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--neon-blue)',
              textShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
            }}
          >
            {'> '}{displayText}
            <span
              className="inline-block w-[2px] h-6 ml-1 align-middle"
              style={{
                background: 'var(--neon-blue)',
                animation: 'typing-cursor 1s infinite',
              }}
            />
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-primary)',
            opacity: 0.8,
            lineHeight: 1.9,
          }}
        >
          Crafting immersive digital experiences through code.
          Specializing in game development, AI systems, and full-stack applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-neon-filled btn-neon"
          >
            <FolderOpen size={16} />
            View Projects
          </button>

          <a
            href="https://drive.google.com/file/d/1B9OnyjL6dPKn_hMNH8eA4PXCC05P7MIT/view?usp=drive_link"
            download
            className="btn-neon"
          >
            <Download size={16} />
            Download Resume
          </a>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-neon btn-neon-purple"
          >
            <Send size={16} />
            Contact Me
          </button>
        </motion.div>

        {/* Decorative HUD elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex items-center justify-center gap-6"
          style={{ color: 'var(--text-muted)' }}
        >
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3))' }} />
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            SYS.2025 // BUILD.007
          </span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.3), transparent)' }} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={20} style={{ color: 'var(--text-muted)' }} />
      </motion.div>

      {/* Side decorations */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 items-center"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-300"
            style={{
              height: i === 2 ? '30px' : '12px',
              background: i === 2 ? 'var(--neon-blue)' : 'rgba(0, 212, 255, 0.2)',
              boxShadow: i === 2 ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none',
            }}
          />
        ))}
      </div>

      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 items-center"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full"
            style={{
              height: i === 2 ? '30px' : '12px',
              background: i === 2 ? 'var(--neon-purple)' : 'rgba(179, 71, 234, 0.2)',
              boxShadow: i === 2 ? '0 0 10px rgba(179, 71, 234, 0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  );
}

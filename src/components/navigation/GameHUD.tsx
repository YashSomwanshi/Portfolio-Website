'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks';
import {
  Home, User, Zap, FolderGit2, Briefcase, Trophy, Mail,
  Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Zap },
  { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

export default function GameHUD() {
  const activeSection = useScrollSpy(navItems.map(item => item.id), 200);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] hidden md:block transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex items-center justify-between rounded-lg px-6 py-3 transition-all duration-300"
            style={{
              background: scrolled ? 'rgba(5, 8, 22, 0.85)' : 'rgba(5, 8, 22, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${scrolled ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 212, 255, 0.05)'}`,
              boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(179, 71, 234, 0.2))',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: 'var(--neon-blue)',
                }}
              >
              YS
              </div>
              <span
                className="text-sm font-semibold tracking-wider hidden lg:block transition-colors"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                YASH
              </span>
            </button>

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3 py-2 rounded transition-all duration-300 group flex items-center gap-2"
                    style={{
                      color: isActive ? 'var(--neon-blue)' : 'var(--text-secondary)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded"
                        style={{
                          background: 'rgba(0, 212, 255, 0.08)',
                          border: '1px solid rgba(0, 212, 255, 0.2)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon size={14} className="relative z-10" />
                    <span
                      className="relative z-10 text-xs font-medium tracking-wider hidden xl:block"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.label}
                    </span>

                    {/* Hover glow */}
                    <span
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'rgba(0, 212, 255, 0.04)',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon-cyan)' }} />
              <span
                className="text-[10px] tracking-wider hidden lg:block"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              >
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100]">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: 'rgba(5, 8, 22, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
          }}
        >
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(179, 71, 234, 0.2))',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                color: 'var(--neon-blue)',
              }}
            >
              YS
            </div>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded transition-colors"
            style={{ color: 'var(--neon-blue)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[99]"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 bottom-0 w-72 z-[101] flex flex-col pt-20 px-6"
                style={{
                  background: 'rgba(5, 8, 22, 0.95)',
                  backdropFilter: 'blur(30px)',
                  borderLeft: '1px solid rgba(0, 212, 255, 0.1)',
                }}
              >
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 p-2"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>

                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center gap-4 py-4 border-b transition-colors group"
                      style={{
                        borderColor: 'rgba(0, 212, 255, 0.05)',
                        color: isActive ? 'var(--neon-blue)' : 'var(--text-secondary)',
                      }}
                    >
                      <Icon size={18} />
                      <span
                        className="text-sm tracking-wider flex-1 text-left"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.label}
                      </span>
                      {isActive && <ChevronRight size={14} style={{ color: 'var(--neon-blue)' }} />}
                    </motion.button>
                  );
                })}

                {/* Status */}
                <div className="mt-auto pb-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon-cyan)' }} />
                  <span
                    className="text-[10px] tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                  >
                    SYSTEM ONLINE
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

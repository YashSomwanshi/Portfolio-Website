'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/loading/LoadingScreen';
import GameHUD from '@/components/navigation/GameHUD';
import HeroSection from '@/components/hero/HeroSection';
import MouseGlow from '@/components/effects/MouseGlow';

// Lazy load heavy sections for performance
const CharacterStats = dynamic(() => import('@/components/about/CharacterStats'), { ssr: false });
const SkillTree = dynamic(() => import('@/components/skills/SkillTree'), { ssr: false });
const ProjectWorlds = dynamic(() => import('@/components/projects/ProjectWorlds'), { ssr: false });
const ProjectSpotlight = dynamic(() => import('@/components/projects/ProjectSpotlight'), { ssr: false });
const JourneyTimeline = dynamic(() => import('@/components/timeline/JourneyTimeline'), { ssr: false });
const TechArsenal = dynamic(() => import('@/components/arsenal/TechArsenal'), { ssr: false });
const BossBattles = dynamic(() => import('@/components/battles/BossBattles'), { ssr: false });
const AchievementSystem = dynamic(() => import('@/components/achievements/AchievementSystem'), { ssr: false });
const StatsDashboard = dynamic(() => import('@/components/stats/StatsDashboard'), { ssr: false });
const CommandCenter = dynamic(() => import('@/components/contact/CommandCenter'), { ssr: false });
const KonamiCode = dynamic(() => import('@/components/easter-eggs/KonamiCode'), { ssr: false });

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {isLoaded && (
        <main className="relative">
          <MouseGlow />
          <GameHUD />
          <KonamiCode />

          <HeroSection />

          <div id="about-divider" className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)' }} />
          <CharacterStats />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(179, 71, 234, 0.1), transparent)' }} />
          <SkillTree />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)' }} />
          <ProjectWorlds />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)' }} />
          <ProjectSpotlight />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 255, 200, 0.1), transparent)' }} />
          <JourneyTimeline />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)' }} />
          <TechArsenal />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 0, 110, 0.1), transparent)' }} />
          <BossBattles />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)' }} />
          <AchievementSystem />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(179, 71, 234, 0.1), transparent)' }} />
          <StatsDashboard />

          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)' }} />
          <CommandCenter />

          {/* Footer */}
          <footer className="py-10 text-center" style={{ borderTop: '1px solid rgba(0, 212, 255, 0.08)' }}>
            <p
              className="text-xs tracking-wider mb-1"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
            >
              © {new Date().getFullYear()} Yash Somwanshi — Crafted with passion & code
            </p>
            <p
              className="text-[10px] tracking-wider mt-2 mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              Built with Next.js • TypeScript • Tailwind CSS • Framer Motion
            </p>
            <div className="flex items-center justify-center gap-6">
              {[
                { label: 'GitHub', url: 'https://github.com/YashSomwanshi' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yash-somwanshi-3670b2292/' },
                { label: 'somwanshiyash14@gmail.com', url: 'mailto:somwanshiyash14@gmail.com' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[10px] tracking-wider transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-blue)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </footer>
        </main>
      )}
    </>
  );
}

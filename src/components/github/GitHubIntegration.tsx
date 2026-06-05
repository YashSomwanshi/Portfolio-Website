'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { GitFork, GitBranch, Star, ExternalLink } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

const languageColors: Record<string, string> = {
  Java: '#b07219',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  'C#': '#178600',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export default function GitHubIntegration() {
  const { ref, isInView } = useInView(0.1);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Placeholder username - replace with actual
  const username = 'YashSomwanshi';

  const fetchGitHub = useCallback(async () => {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
      ]);

      if (userRes.ok && reposRes.ok) {
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        setUser(userData);
        setRepos(reposData);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (isInView && loading) {
      fetchGitHub();
    }
  }, [isInView, loading, fetchGitHub]);

  // Fallback data if API fails
  const displayRepos = error ? [
    { name: 'treasure-simulator', description: 'Multiplayer treasure hunting game', html_url: '#', stargazers_count: 12, language: 'C#', updated_at: '2025-01-01' },
    { name: 'seva-sangam', description: 'Donation platform for NGOs', html_url: '#', stargazers_count: 8, language: 'JavaScript', updated_at: '2025-01-01' },
    { name: 'ai-avatar-platform', description: 'AI-powered avatar creation', html_url: '#', stargazers_count: 15, language: 'Python', updated_at: '2025-01-01' },
    { name: 'ml-experiments', description: 'Machine learning experiments', html_url: '#', stargazers_count: 5, language: 'Python', updated_at: '2025-01-01' },
  ] : repos;

  const displayUser = error ? { public_repos: 12, followers: 25, following: 30 } : user;

  return (
    <section className="relative">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-divider" />
          <h2 className="section-title">GitHub Hub</h2>
          <p className="section-subtitle">{'// CODE REPOSITORY & ACTIVITY'}</p>
        </motion.div>

        {/* Stats row */}
        {displayUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {[
              { label: 'Repositories', value: displayUser.public_repos, color: '#00d4ff' },
              { label: 'Followers', value: displayUser.followers, color: '#b347ea' },
              { label: 'Following', value: displayUser.following, color: '#00ffc8' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card text-center" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: stat.color }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[10px] tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Repos grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {(loading ? Array(4).fill(null) : displayRepos).map((repo, i) => (
            <motion.div
              key={repo?.name || i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {loading ? (
                /* Skeleton */
                <div className="glass-card animate-pulse" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
                  <div className="h-4 w-40 rounded mb-3" style={{ background: 'rgba(0, 212, 255, 0.1)' }} />
                  <div className="h-3 w-full rounded mb-2" style={{ background: 'rgba(0, 212, 255, 0.05)' }} />
                  <div className="h-3 w-2/3 rounded" style={{ background: 'rgba(0, 212, 255, 0.05)' }} />
                </div>
              ) : (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card block group"
                  style={{ padding: 'clamp(16px, 3vw, 24px)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GitBranch size={14} style={{ color: 'var(--neon-blue)' }} />
                      <span
                        className="text-sm font-semibold tracking-wider group-hover:text-[var(--neon-blue)] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                      >
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--neon-blue)' }} />
                  </div>

                  {repo.description && (
                    <p
                      className="text-xs mb-3 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                    >
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: languageColors[repo.language] || '#8892b0' }}
                        />
                        <span
                          className="text-[10px] tracking-wider"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                        >
                          {repo.language}
                        </span>
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star size={10} style={{ color: 'var(--neon-gold)' }} />
                        <span
                          className="text-[10px]"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                        >
                          {repo.stargazers_count}
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* View on GitHub button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon inline-flex"
          >
            <GitFork size={16} />
            View Full Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}

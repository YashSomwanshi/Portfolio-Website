'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks';
import { Send, Terminal, CheckCircle, AlertCircle } from 'lucide-react';

export default function CommandCenter() {
  const { ref, isInView } = useInView(0.1);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 4000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="relative grid-bg">
      <div ref={ref} className="section-container" style={{ paddingBottom: '40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center text-center w-full"
        >
          <div className="section-divider" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <h2 className="section-title text-center" style={{ width: '100%' }}>Command Center</h2>
          <p className="section-subtitle text-center" style={{ width: '100%' }}>{'// SEND A TRANSMISSION'}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Contact info quick cards
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            {[
              { label: 'GitHub', value: '@YashSomwanshi', url: 'https://github.com/YashSomwanshi', color: '#00d4ff' },
              { label: 'LinkedIn', value: 'Yash Somwanshi', url: 'https://www.linkedin.com/in/yash-somwanshi-3670b2292/', color: '#b347ea' },
              { label: 'Email', value: 'somwanshiyash14@gmail.com', url: 'mailto:somwanshiyash14@gmail.com', color: '#00ffc8' },
              { label: 'Mobile', value: '+91 91759 73084', url: 'tel:+919175973084', color: '#ffd700' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-xl text-center group transition-all duration-300 hover:scale-105"
                style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}20`,
                }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-xs font-semibold tracking-wide truncate group-hover:opacity-100 transition-opacity"
                  style={{ fontFamily: 'var(--font-mono)', color: item.color }}
                >
                  {item.value}
                </p>
              </a>
            ))}
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(15, 22, 65, 0.65)',
              border: '1px solid rgba(0, 212, 255, 0.15)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-3 px-6 py-3"
              style={{
                background: 'rgba(0, 212, 255, 0.03)',
                borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
              }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Terminal size={12} style={{ color: 'var(--text-muted)' }} />
                <span
                  className="text-[10px] tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  somwanshiyash14@gmail.com ~ /transmit
                </span>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* System messages */}
              <div className="space-y-1 mb-6">
                <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>
                  {'>'} Connection established...
                </p>
                <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {'>'} Ready to receive transmission. Fill in the fields below.
                </p>
              </div>

              {/* Name */}
              <div>
                <label
                  className="text-xs tracking-wider uppercase mb-2 block flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--neon-blue)' }}>$</span> Identifier (Name)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-300 focus:ring-1"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0, 212, 255, 0.03)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    color: 'var(--text-primary)',
                    caretColor: 'var(--neon-blue)',
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="text-xs tracking-wider uppercase mb-2 block flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--neon-blue)' }}>$</span> Frequency (Email)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-300 focus:ring-1"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0, 212, 255, 0.03)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    color: 'var(--text-primary)',
                    caretColor: 'var(--neon-blue)',
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="text-xs tracking-wider uppercase mb-2 block flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--neon-blue)' }}>$</span> Transmission (Message)
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-300 resize-none focus:ring-1"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0, 212, 255, 0.03)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    color: 'var(--text-primary)',
                    caretColor: 'var(--neon-blue)',
                  }}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between">
                <AnimatePresence mode="wait">
                  {formState === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle size={14} style={{ color: '#00ffc8' }} />
                      <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: '#00ffc8' }}>
                        Transmission sent successfully!
                      </span>
                    </motion.div>
                  )}
                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <AlertCircle size={14} style={{ color: '#ff006e' }} />
                      <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: '#ff006e' }}>
                        Transmission failed. Try again.
                      </span>
                    </motion.div>
                  )}
                  {(formState === 'idle' || formState === 'sending') && (
                    <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      All fields required
                    </span>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="btn-neon btn-neon-filled"
                  style={{ color: '#050816' }}
                >
                  <Send size={14} />
                  {formState === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Social links below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8"
            style={{ marginTop: '56px' }}
          >
            {[
              { label: 'GitHub', url: 'https://github.com/YashSomwanshi' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yash-somwanshi-3670b2292/' },
              { label: 'Email', url: 'mailto:somwanshiyash14@gmail.com' },
              { label: '+91 9175973084', url: 'tel:+919175973084' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs tracking-wider uppercase transition-all duration-300 hover:text-[var(--neon-blue)]"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Cinematic entrance delay
    const timer1 = setTimeout(() => setLoading(false), 1800);
    const timer2 = setTimeout(() => setRemoved(true), 2600);
    return () => { clearTimeout(timer1); clearTimeout(timer2); }
  }, []);

  if (removed) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'var(--deep-space)', zIndex: 99999,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
      opacity: loading ? 1 : 0,
      pointerEvents: loading ? 'all' : 'none'
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(24px, 5vw, 42px)',
        fontWeight: 700,
        color: 'var(--electric-cyan)',
        letterSpacing: '12px',
        animation: 'pulseGlow 1.5s infinite alternate'
      }}>
        BALU STUDIO
      </div>
      <style>{`
        @keyframes pulseGlow {
          0% { opacity: 0.4; filter: blur(4px); transform: scale(0.95); text-shadow: 0 0 0 rgba(0,255,255,0); }
          100% { opacity: 1; filter: blur(0); transform: scale(1); text-shadow: 0 0 20px rgba(0,255,255,0.6); }
        }
      `}</style>
    </div>
  );
}

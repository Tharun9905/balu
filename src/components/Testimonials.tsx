import React, { useState, useEffect } from 'react';

const testimonials = [
  { text: "Balu captured our wedding perfectly! The cinematic shots were breathtaking and they made us feel incredibly comfortable.", author: "Sneha & Rahul" },
  { text: "An absolute masterclass in candid photography. The reels they produced were a huge hit with our entire family.", author: "Priya M." },
  { text: "We booked Balu Studio for our corporate gala. The quality of the final edits exceeded our expectations completely.", author: "TechCorp India" },
  { text: "Their creative oil paint edits are legendary in Kalyandurg. Definitely looking forward to booking our next shoot!", author: "Kiran R." }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
      <div 
        style={{
          display: 'flex',
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {testimonials.map((t, i) => (
          <div key={i} style={{ minWidth: '100%', padding: '40px 20px', textAlign: 'center' }}>
            <div style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '60px 40px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
            }} className="hoverable">
              <svg width="40" height="40" viewBox="0 0 24 24" style={{ fill: 'var(--electric-cyan)', opacity: 0.5, marginBottom: '20px' }}>
                <path d="M14.017 21v-7.391c0-5.714 4.026-6.471 6.454-6.609v2.204c-2.042.138-3.962 1.201-3.962 3.636h3.492v8.16H14.017zM4.017 21v-7.391c0-5.714 4.026-6.471 6.454-6.609v2.204c-2.042.138-3.962 1.201-3.962 3.636h3.492v8.16H4.017z"/>
              </svg>
              <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '30px' }}>
                "{t.text}"
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--electric-cyan)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                — {t.author}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: i === currentIndex ? 'var(--electric-cyan)' : 'var(--space-mid)',
              border: `1px solid ${i === currentIndex ? 'transparent' : 'var(--glass-border)'}`,
              cursor: 'none', transition: 'all 0.3s ease'
            }}
            className="hoverable"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

import React from 'react';

const services = [
  {
    title: 'Candid Photography',
    desc: 'Unposed, authentic moments captured with expert timing.',
    tag: 'Natural Light · Lifestyle',
    icon: <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
  },
  {
    title: 'Wedding & Pre-Wedding',
    desc: 'Cinematic love stories told through timeless imagery.',
    tag: 'Couple Shoots · Portraits',
    icon: <svg viewBox="0 0 24 24"><circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/></svg>
  },
  {
    title: 'Event Coverage',
    desc: 'Birthdays, receptions, and corporate moments—fully covered.',
    tag: 'Events · Functions',
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  },
  {
    title: 'Instagram Reels & Video',
    desc: 'Professional video content for brands, artists & events.',
    tag: 'Reels · Short Films',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
  },
  {
    title: 'Oil Painting & Edits',
    desc: 'Transform photos into artistic oil paintings and collages.',
    tag: 'Digital Art · Retouching',
    icon: <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.06 0 1.93-.84 1.98-1.89l.02-.11c0-.52-.2-1.02-.57-1.4-.38-.38-.63-.92-.63-1.5 0-1.1.9-2 2-2h1c3.87 0 7-3.13 7-7 0-4.97-4.93-9-11-9z"/></svg>
  },
  {
    title: 'Mug Prints & Gifts',
    desc: 'Custom printed gifts—mugs, frames, and canvas prints.',
    tag: 'Gifts · Keepsakes',
    icon: <svg viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
  }
];

export default function ServiceCards() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(800px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
      {services.map((item, i) => (
        <div 
          key={i}
          className="service-card reveal"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(0, 255, 255, 0.10)',
            borderRadius: '16px',
            padding: '32px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          <div style={{ width: '48px', height: '48px', marginBottom: '24px', stroke: 'var(--electric-cyan)', fill: 'none', strokeWidth: 1.5 }}>
            {item.icon}
          </div>
          <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
          <p style={{ opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>{item.desc}</p>
          <span style={{ fontSize: '12px', color: 'var(--soft-violet)', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>{item.tag}</span>
        </div>
      ))}
      <style>{`
        .service-card:hover {
          box-shadow: 0 20px 60px rgba(0, 255, 255, 0.12);
          border-color: rgba(0, 255, 255, 0.35);
        }
      `}</style>
    </div>
  );
}

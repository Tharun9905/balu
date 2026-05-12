import React from 'react';

const services = [
  {
    title: 'Haldi & Mehendi',
    desc: 'Vibrant, colourful, and joy-filled pre-wedding rituals captured perfectly.',
    tag: 'Pre-Wedding · Rituals',
    image: '/services/haldi.png'
  },
  {
    title: 'Candid Photography',
    desc: 'Unposed, authentic moments captured with expert timing.',
    tag: 'Natural Light · Lifestyle',
    image: '/services/candid.png'
  },
  {
    title: 'Wedding & Pre-Wedding',
    desc: 'Cinematic love stories told through timeless imagery.',
    tag: 'Couple Shoots · Portraits',
    image: '/services/wedding.png'
  },
  {
    title: 'Event Coverage',
    desc: 'Birthdays, receptions, and corporate moments—fully covered.',
    tag: 'Events · Functions',
    image: '/services/event.png'
  },
  {
    title: 'Instagram Reels & Video',
    desc: 'Professional video content for brands, artists & events.',
    tag: 'Reels · Short Films',
    image: '/services/reels.png'
  },
  {
    title: 'Oil Painting & Edits',
    desc: 'Transform photos into artistic oil paintings and collages.',
    tag: 'Digital Art · Retouching',
    image: '/services/oil.png'
  },
  {
    title: 'Mug Prints & Gifts',
    desc: 'Custom printed gifts—mugs, frames, and canvas prints.',
    tag: 'Gifts · Keepsakes',
    image: '/services/mug.png'
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

  const handleCardClick = (category: string) => {
    window.dispatchEvent(new CustomEvent('filterGallery', { detail: category }));
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
      {services.map((item, i) => {
        let cat = 'creative';
        if (item.title.toLowerCase().includes('haldi')) cat = 'haldi';
        else if (item.title.toLowerCase().includes('candid')) cat = 'candid';
        else if (item.title.toLowerCase().includes('wedding')) cat = 'wedding';
        else if (item.title.toLowerCase().includes('event')) cat = 'events';
        else if (item.title.toLowerCase().includes('reel')) cat = 'reels';
        else if (item.title.toLowerCase().includes('oil')) cat = 'oil';
        else if (item.title.toLowerCase().includes('mug')) cat = 'mug';

        return (
          <div 
            key={i}
            className="service-card reveal"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCardClick(cat)}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
          >
            <div style={{ width: '100%', height: '200px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }} />
            <div style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>{item.desc}</p>
              <span style={{ fontSize: '12px', color: 'var(--soft-violet)', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>{item.tag}</span>
            </div>
          </div>
        );
      })}
      <style>{`
        .service-card:hover {
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.35);
        }
      `}</style>
    </div>
  );
}

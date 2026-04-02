import React, { useState } from 'react';

const galleryItems = [
  { id: 1, title: 'The Sharma Wedding', tag: 'Weddings', category: 'weddings', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Riya + Arun Pre-Wedding', tag: 'Weddings', category: 'weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Kalyandurg Candid Series', tag: 'Candid', category: 'candid', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Editorial Portrait', tag: 'Creative', category: 'creative', image: 'https://images.unsplash.com/photo-1494955870715-979c4f101783?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Corporate Gala 2024', tag: 'Events', category: 'events', image: 'https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Baby Wonderland Shoot', tag: 'Candid', category: 'candid', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Birthday Bash', tag: 'Events', category: 'events', image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Engagement Details', tag: 'Weddings', category: 'weddings', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80' },
  { id: 9, title: 'Creative Concepts', tag: 'Creative', category: 'creative', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80' }
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<any>(null);

  const filteredItems = galleryItems.filter(item => filter === 'all' || item.category === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {['all', 'weddings', 'candid', 'events', 'creative'].map(f => (
          <button 
            key={f}
            className={`filter-btn hoverable ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'rgba(0,255,255,0.15)' : 'transparent',
              border: `1px solid ${filter === f ? 'var(--electric-cyan)' : 'var(--glass-border)'}`,
              color: 'var(--stellar-white)',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize'
            }}
          >
            {f}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="gallery-item hoverable"
            onClick={() => setLightboxItem(item)}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              cursor: 'none',
              animation: 'fadeUp 0.5s forwards',
              opacity: 0,
              animationDelay: `${index * 0.05}s`
            }}
          >
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="placeholder" />
            <div className="gallery-overlay" style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(4, 4, 15, 0.75)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              opacity: 0, transition: 'opacity 0.3s ease, border 0.3s',
              border: '2px solid transparent', borderRadius: '12px'
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', textAlign: 'center', padding: '0 16px', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--electric-cyan)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.tag}</div>
            </div>
          </div>
        ))}
      </div>

      {lightboxItem && (
        <div 
          onClick={(e) => { if(e.target === e.currentTarget) setLightboxItem(null); }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(4, 4, 15, 0.9)', backdropFilter: 'blur(10px)',
            zIndex: 1000, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', cursor: 'none'
          }}
        >
          <div style={{ position: 'absolute', top: '40px', right: '40px', color: 'white', fontSize: '32px', cursor: 'none' }} onClick={() => setLightboxItem(null)} className="hoverable">&times;</div>
          <div style={{ width: '80%', height: '80%', borderRadius: '8px', backgroundImage: `url(${lightboxItem.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
          <div style={{ marginTop: '20px', fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--electric-cyan)' }}>{lightboxItem.title}</div>
        </div>
      )}

      <style>{`
        .gallery-item:hover .placeholder { transform: scale(1.04); }
        .gallery-item:hover .gallery-overlay { opacity: 1; border-color: var(--electric-cyan); box-shadow: inset 0 0 20px rgba(0,255,255,0.3); }
        .filter-btn:hover { background: rgba(0,255,255,0.15) !important; border-color: var(--electric-cyan) !important; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(20px); } }
      `}</style>
    </div>
  );
}

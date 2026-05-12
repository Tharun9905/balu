import React, { useState } from 'react';

const defaultGalleryItems = [
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

const defaultCategories = ['all', 'weddings', 'candid', 'events', 'creative'];

export default function Gallery({ items = defaultGalleryItems, categories = defaultCategories }: any) {
  const [filter, setFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredItems = items.filter((item: any) => filter === 'all' || item.category === filter);
  const visibleItems = filteredItems.slice(0, visibleCount);

  React.useEffect(() => {
    setVisibleCount(9);
  }, [filter]);

  React.useEffect(() => {
    const handleFilterEvent = (e: any) => {
      if (e.detail) {
        setFilter(e.detail);
      }
    };
    window.addEventListener('filterGallery', handleFilterEvent);
    return () => window.removeEventListener('filterGallery', handleFilterEvent);
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = filteredItems.findIndex((item: any) => item.id === lightboxItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentIndex + 1]);
    } else {
      setLightboxItem(filteredItems[0]);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = filteredItems.findIndex((item: any) => item.id === lightboxItem.id);
    if (currentIndex > 0) {
      setLightboxItem(filteredItems[currentIndex - 1]);
    } else {
      setLightboxItem(filteredItems[filteredItems.length - 1]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {categories.map((f: string) => (
          <button 
            key={f}
            className={`filter-btn hoverable ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
              border: `1px solid ${filter === f ? 'var(--electric-cyan)' : 'var(--glass-border)'}`,
              color: 'var(--stellar-white)',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
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
        {visibleItems.map((item: any, index: number) => (
          <div 
            key={item.id} 
            className="gallery-item hoverable"
            onClick={() => setLightboxItem(item)}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              cursor: 'pointer',
              animation: 'fadeUp 0.5s forwards',
              opacity: 0,
              animationDelay: `${index * 0.05}s`
            }}
          >
            <div style={{ width: '100%', height: '100%', backgroundImage: `url("${item.image}")`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="placeholder" />
            <div className="gallery-overlay" style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(253, 251, 247, 0.75)',
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

      {visibleCount < filteredItems.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button 
            className="btn btn-ghost hoverable" 
            onClick={() => setVisibleCount(prev => prev + 9)}
            style={{ cursor: 'auto' }}
          >
            Load More ↓
          </button>
        </div>
      )}

      {lightboxItem && (
        <div 
          onClick={(e) => { if(e.target === e.currentTarget) setLightboxItem(null); }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(253, 251, 247, 0.9)', backdropFilter: 'blur(10px)',
            zIndex: 1000, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: '40px', right: '40px', color: 'white', fontSize: '32px', cursor: 'pointer', zIndex: 1010 }} onClick={() => setLightboxItem(null)} className="hoverable">&times;</div>
          
          <button onClick={handlePrev} className="hoverable" style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'white', fontSize: '40px', cursor: 'pointer', zIndex: 1010 }}>&#10094;</button>
          
          <div style={{ width: '80%', height: '80%', borderRadius: '8px', backgroundImage: `url("${lightboxItem.image}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
          
          <button onClick={handleNext} className="hoverable" style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'white', fontSize: '40px', cursor: 'pointer', zIndex: 1010 }}>&#10095;</button>
          <div style={{ marginTop: '20px', fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--electric-cyan)' }}>{lightboxItem.title}</div>
        </div>
      )}

      <style>{`
        .gallery-item:hover .placeholder { transform: scale(1.04); }
        .gallery-item:hover .gallery-overlay { opacity: 1; border-color: var(--electric-cyan); box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.3); }
        .filter-btn:hover { background: rgba(212, 175, 55, 0.15) !important; border-color: var(--electric-cyan) !important; color: #000 !important; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(20px); } }
      `}</style>
    </div>
  );
}

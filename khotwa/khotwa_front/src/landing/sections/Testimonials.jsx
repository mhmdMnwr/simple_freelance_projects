import { useState, useEffect } from 'react'
import { publicApi } from '../publicApi'

export default function Testimonials() {
  const [images, setImages] = useState([])

  useEffect(() => {
    publicApi.getTestimonials()
      .then(data => setImages(data))
      .catch(err => console.error('Failed to load testimonials', err))
  }, [])

  if (images.length === 0) return null;

  return (
    <section className="l-testimonials" id="testimonials" style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="l-container">
        <div className="l-testimonials-header fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="l-section-label">آراء حول المؤسسة</span>
          <h2 className="l-section-heading">آراء التلاميذ والأولياء</h2>
          <p className="l-testimonials-sub" style={{ color: 'var(--text-muted)', marginTop: 8 }}>نعتز بشهاداتكم ونفخر بثقتكم بنا.</p>
        </div>
        
        <div className="l-testimonials-grid fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {images.map(item => (
            <div key={item._id} className="l-testimonial-card" style={{ 
              borderRadius: 'var(--radius)', 
              overflow: 'hidden', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid var(--border-color)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={item.imageUrl} 
                alt="Testimonial" 
                style={{ width: '100%', display: 'block', objectFit: 'contain', background: '#f9f9f9' }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

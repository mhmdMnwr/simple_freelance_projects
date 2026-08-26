import { useState, useEffect, useCallback } from 'react'
import { publicApi } from '../publicApi'

export default function Testimonials() {
  const [images, setImages] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    publicApi.getTestimonials()
      .then(data => setImages(data))
      .catch(err => console.error('Failed to load testimonials', err))
  }, [])

  const next = useCallback(() => {
    if (images.length > 0) setCurrent(c => (c + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    if (images.length > 0) setCurrent(c => (c - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, images.length])

  if (images.length === 0) return null;

  const item = images[current]

  return (
    <section className="l-testimonials" id="testimonials" style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="l-container">
        <div className="l-testimonials-header fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="l-section-label">آراء حول المؤسسة</span>
          <h2 className="l-section-heading">آراء التلاميذ والأولياء</h2>
          <p className="l-testimonials-sub" style={{ color: 'var(--text-muted)', marginTop: 8 }}>نعتز بشهاداتكم ونفخر بثقتكم بنا.</p>
        </div>
        
        <div className="l-ann-carousel fade-up" style={{ paddingBottom: '30px' }}>
          <button className="l-ann-arrow l-ann-arrow-r" onClick={prev} aria-label="السابق" disabled={images.length <= 1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <div className="l-ann-slide" key={current} style={{ cursor: 'default', background: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
            <img 
              src={item.imageUrl} 
              alt="Testimonial" 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} 
            />
          </div>

          <button className="l-ann-arrow l-ann-arrow-l" onClick={next} aria-label="التالي" disabled={images.length <= 1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {images.length > 1 && (
            <div className="l-ann-dots">
              {images.map((_, i) => (
                <button key={i} className={`l-ann-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

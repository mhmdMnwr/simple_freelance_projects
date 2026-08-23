import { useState, useEffect, useCallback } from 'react'
import { publicApi } from '../publicApi'

export default function Announcements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewItem, setViewItem] = useState(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    publicApi.getAnnouncements().then(setItems).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const next = useCallback(() => {
    if (items.length > 0) setCurrent(c => (c + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    if (items.length > 0) setCurrent(c => (c - 1 + items.length) % items.length)
  }, [items.length])

  // Auto-slide
  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, items.length])

  const formatDate = (iso) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const item = items[current]

  return (
    <section className="l-announcements" id="announcements">
      <div className="l-container">
        <div className="l-announcements-header fade-up">
          <span className="l-section-label">آخر الأخبار</span>
          <h2 className="l-section-heading">الإعلانات</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>جاري التحميل...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>لا توجد إعلانات حالياً</div>
        ) : (
          <div className="l-ann-carousel fade-up">
            <button className="l-ann-arrow l-ann-arrow-r" onClick={prev} aria-label="السابق">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div className="l-ann-slide" onClick={() => setViewItem(item)} key={current}>
              {item.imageUrl ? (
                <div className="l-ann-slide-img">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              ) : (
                <div className="l-ann-slide-img l-ann-slide-ph">📢</div>
              )}
              <div className="l-ann-slide-body">
                <div className="l-ann-title">{item.title}</div>
                <div className="l-ann-date">{formatDate(item.createdAt)}</div>
                <span className="l-ann-readmore">اقرأ المزيد ←</span>
              </div>
            </div>

            <button className="l-ann-arrow l-ann-arrow-l" onClick={next} aria-label="التالي">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {/* Dots */}
            <div className="l-ann-dots">
              {items.map((_, i) => (
                <button key={i} className={`l-ann-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {viewItem && (
        <div className="l-ann-modal" onClick={() => setViewItem(null)}>
          <div className="l-ann-modal-bg" />
          <div className="l-ann-modal-card" onClick={e => e.stopPropagation()}>
            <button className="l-ann-modal-close" onClick={() => setViewItem(null)}>✕</button>
            {viewItem.imageUrl && <img src={viewItem.imageUrl} alt={viewItem.title} />}
            <div className="l-ann-modal-body">
              <div className="l-ann-modal-title">{viewItem.title}</div>
              <div className="l-ann-modal-date">{formatDate(viewItem.createdAt)}</div>
              <p className="l-ann-modal-text">{viewItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

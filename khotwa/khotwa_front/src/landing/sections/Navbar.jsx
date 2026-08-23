import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-20% 0px -60% 0px' }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const links = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'teachers', label: 'الأساتذة' },
    { id: 'timetable', label: 'البرنامج' },
    { id: 'announcements', label: 'الإعلانات' },
  ]

  const close = () => setMobileOpen(false)

  return (
    <>
      <nav className={`l-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="l-nav-inner">
          <div className="l-nav-brand">
            <img src="/logo.jpg" alt="خطوة" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
            <span>مؤسسة <span className="brand-gold">خطوة</span> التعليمية</span>
          </div>
          <div className="l-nav-links">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="#register" className="l-nav-cta">سجل الآن</a>
            <button className="l-hamburger" onClick={() => setMobileOpen(true)}>☰</button>
          </div>
        </div>
      </nav>

      <div className={`l-mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="l-mobile-panel">
          <div className="l-mobile-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: '1.1rem' }}>
              <img src="/logo.jpg" alt="خطوة" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
              <span>مؤسسة <span style={{ color: 'var(--gold)' }}>خطوة</span> التعليمية</span>
            </div>
            <button className="l-mobile-close" onClick={close}>✕</button>
          </div>
          <div className="l-mobile-links">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={close}>{l.label}</a>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <a href="#register" className="l-btn-gold" onClick={close} style={{ display: 'block', textAlign: 'center' }}>سجل الآن</a>
          </div>
        </div>
        <div className="l-mobile-backdrop" onClick={close}></div>
      </div>
    </>
  )
}

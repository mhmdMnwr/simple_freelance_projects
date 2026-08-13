import { useEffect, useRef } from 'react'
import CanvasContainer from './components/3d/CanvasContainer'
import ServicesCarousel from './components/ServicesCarousel'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Navbar from './components/Navbar'
import FloatingContact from './components/FloatingContact'

export default function App() {
  const ref = useRef()

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-a]')
    els?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      setTimeout(() => {
        el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100)
    })
  }, [])

  /* Scroll-triggered reveal for services section */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .hero-text-right {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          right: 6%;
          z-index: 10;
          text-align: right;
          direction: rtl;
        }
        .hero-features-left {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          left: 7%;
          z-index: 10;
          direction: rtl;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .hero-stats-bar {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: max-content;
        }
        .hero-stats-inner {
          display: flex;
          gap: 3.5rem;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 100px;
          padding: 1rem 3.5rem;
          box-shadow: 0 8px 32px rgba(0, 132, 199, 0.05);
          direction: rtl;
        }

        @media (max-width: 768px) {
          .hero-text-right {
            top: 7.5rem;
            bottom: auto;
            right: 5%;
            left: 5%;
            text-align: center;
            transform: none;
          }
          .hero-features-left {
            display: none !important;
          }
          .hero-stats-bar {
            bottom: 1rem;
            width: 94%;
          }
          .hero-stats-inner {
            gap: 0.8rem;
            padding: 0.7rem 0.8rem;
            border-radius: 18px;
            justify-content: center;
            width: 100%;
          }
          .hero-stat-value {
            font-size: 1rem !important;
          }
          .hero-stat-label {
            font-size: 0.65rem !important;
          }
          .hero-3d-canvas {
            top: 20% !important;
            bottom: 0 !important;
            height: auto !important;
          }
        }
      `}</style>

      <Navbar />

      <section
        ref={ref}
        dir="rtl"
        style={{
          height: '100vh',
          height: '100dvh',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(170deg, #F8FAFC 0%, #E2E8F0 50%, #CBD5E1 100%)',
          direction: 'ltr',
        }}
      >
        {/* ─── 3D CANVAS (fullscreen background) ─── */}
        <div className="hero-3d-canvas" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <CanvasContainer />
        </div>

        {/* ─── TEXT on the right side ─── */}
        <div className="hero-text-right">
          <h2 data-a style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 700,
            color: '#475569',
            marginBottom: '0.5rem',
          }}>
            أخصائي بصريات
          </h2>
          <h1 data-a style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.3,
          }}>
            إطارات
          </h1>
          <h1 data-a style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800,
            color: '#0284C7',
            lineHeight: 1.3,
          }}>
            أنيقة و عصرية
          </h1>
        </div>

        {/* ─── LEFT SIDE FEATURES ─── */}
        <div className="hero-features-left">
          {[
            { title: 'خبرة تفوق 15 سنة', sub: 'نقدم لك أفضل رعاية بصرية' },
            { title: 'جميع انواع الزجاج', sub: 'حماية وتقنية عالية للعين' },
            { title: 'كل أنواع العدسات اللاصقة   ', sub: 'السنوية و الشهرية ' },
          ].map((item, i) => (
            <div key={i} data-a className="feature-card" style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '24px',
              padding: '0.4rem 0.4rem 0.4rem 1.8rem',
              gap: '1.2rem',
              boxShadow: '0 8px 32px rgba(0, 132, 199, 0.05)',
              width: '320px'
            }}>
              {/* Icon Box (Renders on the right due to RTL) */}
              <div className="feature-icon-box" style={{
                width: '54px', height: '54px', borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(2, 132, 199, 0.1))',
                border: '1px solid rgba(2, 132, 199, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="#0284C7" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M12 7.5L16.5 12L12 16.5L7.5 12L12 7.5Z" fill="#0284C7" />
                </svg>
              </div>

              {/* Text Box (Renders on the left due to RTL) */}
              <div style={{ textAlign: 'right', flex: 1 }}>
                <p style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontSize: '0.95rem', fontWeight: 800, color: '#0F172A',
                  marginBottom: '0.1rem'
                }}>
                  {item.title}
                </p>
                <p style={{
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '0.8rem', fontWeight: 600, color: '#64748B',
                }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── BOTTOM TRUST BAR (STATS) ─── */}
        <div className="hero-stats-bar">
          <div data-a className="hero-stats-inner">
            {[
              { value: '+15', label: 'سنة  خبرة' },
              { value: '+500', label: 'عميل سعيد' },
              { value: '+50', label: 'ماركة عالمية' },
              { value: '+2000', label: 'فحص دقيق' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                <span className="hero-stat-value" style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.6rem', fontWeight: 800, color: '#0284C7',
                  direction: 'ltr'
                }}>
                  {stat.value}
                </span>
                <span className="hero-stat-label" style={{
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700, color: '#0F172A'
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════════════════
           SERVICES SECTION
         ═══════════════════════════════════════════════════════ */}
      <ServicesCarousel />
      {/* ═══════════════════════════════════════════════════════
           ABOUT US SECTION
         ═══════════════════════════════════════════════════════ */}
      <AboutSection />
      {/* ═══════════════════════════════════════════════════════
           CONTACT SECTION
         ═══════════════════════════════════════════════════════ */}
      <ContactSection />

      <FloatingContact />
    </>
  )
}

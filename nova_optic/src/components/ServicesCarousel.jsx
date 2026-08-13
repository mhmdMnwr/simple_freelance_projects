import { useState, useEffect, useCallback } from 'react'

const SERVICES = [
  {
    id: 1,
    num: '01',
    image: '/services/medical-lenses.jpg',
    tag: 'عدسات طبية',
    title: 'جميع أنواع الزجاج الطبي',
    desc: 'نوفر مختلف أنواع الزجاج المصحح لمشاكل النظر، بما في ذلك قصر النظر وطول النظر والاستجماتيزم. عدسات متعددة البؤر وأحادية البؤر بأعلى معايير الجودة.',
    accent: '#0284C7',
  },
  {
    id: 2,
    num: '02',
    image: '/services/premium-frames.jpg',
    tag: 'إطارات عالمية',
    title: 'أفخم الإطارات من أشهر الماركات',
    desc: 'تشكيلة واسعة من أرقى الإطارات العالمية المختارة بعناية. تصاميم عصرية تجمع بين الأناقة والمتانة لتناسب جميع الأذواق.',
    accent: '#D97706',
    brands: ['Ray-Ban', 'Perfecto', 'Ange', 'Opera', 'Rafting', 'Minima Titanium', 'Kosby'],
  },
  {
    id: 3,
    num: '03',
    image: '/services/kids-glasses.png',
    tag: 'نظارات أطفال',
    title: 'زجاج خاص بالأطفال',
    desc: 'زجاج مخصص للأطفال يساعد على الحد من تطور قصر النظر والحفاظ على صحة العين. إطارات مرنة وغير قابلة للكسر مصممة خصيصاً للصغار.',
    accent: '#10B981',
  },
  {
    id: 4,
    num: '04',
    image: '/services/premium-glasses.jpg',
    tag: 'ماركات فاخرة',
    title: 'أفخم وأجود أنواع الزجاج',
    desc: 'عدسات فاخرة من أرقى الدور العالمية. نوفر تشكيلة حصرية من أجود أنواع الزجاج لتجربة بصرية استثنائية.',
    accent: '#8B5CF6',
    brands: ['INVU Groupe Suisse', 'Maje', 'Lancel', 'Chantal Thomas', 'Einar'],
  },
  {
    id: 5,
    num: '05',
    image: '/services/german-tech.jpg',
    tag: 'تقنية متقدمة',
    title: 'ترقيق الزجاج بتقنية ألمانية',
    desc: 'تقنية متطورة لترقيق الزجاج والحصول على عدسات أنحف وأخف وزناً وأكثر راحة وأناقة. مثالية للوصفات العالية.',
    accent: '#6366F1',
  },
  {
    id: 6,
    num: '06',
    image: '/services/contact-lenses.png',
    tag: 'عدسات لاصقة',
    title: 'جميع أنواع العدسات اللاصقة',
    desc: 'نوفر مختلف أنواع العدسات اللاصقة السنوية والشهرية واليومية، الطبية والتجميلية، لتلبية مختلف الاحتياجات البصرية.',
    accent: '#0EA5E9',
  },
  {
    id: 7,
    num: '07',
    image: '/services/affordable.jpg',
    tag: 'أسعار مناسبة',
    title: 'أسعار في متناول الجميع',
    desc: 'جودة عالية وخدمات احترافية بأسعار مناسبة لمختلف الميزانيات.',
    accent: '#EC4899',
    prices: [
      { label: 'نظارات الأطفال ابتداءً من', price: '3,500 دج' },
      { label: 'نظارات غير قابلة للكسر ابتداءً من', price: '4,500 دج' },
    ],
  },
]

/* ── Reusable Arrow Button ── */
function ArrowBtn({ direction, onClick, accent }) {
  const isNext = direction === 'next'
  return (
    <button
      className="arrow-btn"
      onClick={onClick}
      aria-label={isNext ? 'Next service' : 'Previous service'}
      style={{
        '--accent': accent,
        '--accent-shadow': `${accent}44`,
      }}
    >
      {/* Arrow icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {isNext
          ? <polyline points="9 6 15 12 9 18" />
          : <polyline points="15 6 9 12 15 18" />
        }
      </svg>
    </button>
  )
}

export default function ServicesCarousel() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const DURATION = 6000

  const goTo = useCallback((idx) => {
    if (isTransitioning || idx === active) return
    setIsTransitioning(true)
    setContentKey(k => k + 1)
    setActive(idx)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning, active])

  const next = useCallback(() => goTo((active + 1) % SERVICES.length), [active, goTo])
  const prev = useCallback(() => goTo((active - 1 + SERVICES.length) % SERVICES.length), [active, goTo])

  /* Auto-advance */
  useEffect(() => {
    const t = setTimeout(next, DURATION)
    return () => clearTimeout(t)
  }, [active, next])

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') next()
      if (e.key === 'ArrowRight') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const s = SERVICES[active]

  /* Content transition styles */
  const fadeIn = {
    animation: 'serviceFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
  }

  return (
    <>
      {/* Inline keyframes for content transitions */}
      <style>{`
        @keyframes serviceFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .arrow-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          color: #FFFFFF;
          outline: none;
        }
        @media (hover: hover) {
          .arrow-btn:hover {
            background: var(--accent);
            border-color: var(--accent);
            transform: scale(1.1);
            box-shadow: 0 8px 24px var(--accent-shadow);
          }
        }
        .svc-info-container {
          min-height: 160px;
          display: flex;
          flex-direction: column;
        }
        .svc-carousel-area {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 2rem 5% 3rem;
          position: relative;
          gap: 4rem;
        }
        .svc-image-col {
          flex: 0 0 50%;
          position: relative;
          z-index: 2;
          height: 460px;
        }
        .svc-content-col {
          flex: 1;
          position: relative;
          z-index: 2;
          padding-right: 1rem;
        }
        @media (max-width: 768px) {
          .svc-carousel-area {
            flex-direction: column;
            gap: 1.5rem;
            padding: 1rem 5% 2rem;
          }
          .svc-image-col {
            flex: none;
            width: 100%;
            height: 260px;
          }
          .svc-content-col {
            padding-right: 0;
            width: 100%;
          }
          .svc-info-container {
            min-height: 240px;
          }
        }
      `}</style>

      <section
        id="services"
        dir="rtl"
        style={{
          minHeight: '100vh',
          background: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ─── Section Header ─── */}
        <div style={{
          textAlign: 'center',
          padding: '4rem 5% 2rem',
          position: 'relative', zIndex: 10,
        }}>
          <p style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: '0.95rem', fontWeight: 700,
            letterSpacing: '0.2em', color: '#0EA5E9',
            marginBottom: '0.6rem',
          }}>
            خدماتنا
          </p>
          <h2 style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 800, color: '#FFFFFF',
            lineHeight: 1.4,
          }}>
            كل ما تحتاجه لصحة بصرك
          </h2>
          <div style={{
            width: '50px', height: '3px', borderRadius: '2px',
            background: 'linear-gradient(90deg, #0284C7, #0EA5E9)',
            margin: '1rem auto 0',
          }} />
        </div>

        {/* ─── Main Carousel Area ─── */}
        <div className="svc-carousel-area">

          {/* Background ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            overflow: 'hidden',
          }}>
            {SERVICES.map((srv, i) => (
              <div key={srv.id} style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${srv.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: i === active ? 0.1 : 0,
                filter: 'blur(60px) saturate(1.4)',
                transition: 'opacity 1s ease',
              }} />
            ))}
          </div>

          {/* ─── Left: Image showcase ─── */}
          <div className="svc-image-col">
            <div style={{
              position: 'relative',
              width: '100%', height: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)`,
            }}>
              {/* Images */}
              {SERVICES.map((srv, i) => (
                <img
                  key={srv.id}
                  src={srv.image}
                  alt={srv.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%', height: '100%',
                    objectFit: srv.image.includes('lenses') ? 'contain' : 'cover',
                    opacity: i === active ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                  }}
                />
              ))}

              {/* Bottom gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(0deg, rgba(15,23,42,0.7) 0%, transparent 50%)`,
              }} />

              {/* Accent bottom line on image */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '3px',
                background: s.accent,
                transition: 'background 0.5s ease',
              }} />

              {/* Slide counter badge */}
              <div style={{
                position: 'absolute', top: '1.5rem', left: '1.5rem',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '0.45rem 0.9rem',
                display: 'flex', alignItems: 'baseline', gap: '0.3rem',
                direction: 'ltr',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.3rem', fontWeight: 800, color: s.accent,
                  transition: 'color 0.5s ease',
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                }}>
                  / {String(SERVICES.length).padStart(2, '0')}
                </span>
              </div>

              {/* Tag badge on image */}
              <div style={{
                position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                background: `${s.accent}22`,
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${s.accent}44`,
                borderRadius: '10px',
                padding: '0.35rem 0.9rem',
                transition: 'all 0.5s ease',
              }}>
                <span key={contentKey} style={{
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF',
                  ...fadeIn,
                }}>
                  {s.tag}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Right: Content ─── */}
          <div className="svc-content-col">
            {/* Accent line and Title grouped side-by-side (line on the right in RTL) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '4px', height: '40px', borderRadius: '2px',
                background: s.accent,
                transition: 'background 0.5s ease',
              }} />
              
              <h3 key={`t-${contentKey}`} style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 800, color: '#FFFFFF',
                lineHeight: 1.4,
                ...fadeIn,
              }}>
                {s.title}
              </h3>
            </div>

            {/* Fixed height container to prevent the widget from jumping when text changes */}
            <div className="svc-info-container">
              {/* Description (animated with slight delay and line clamped) */}
              <p key={`d-${contentKey}`} style={{
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '1.05rem', fontWeight: 500,
                color: '#94A3B8',
                lineHeight: 1.8,
                marginBottom: '1.2rem',
                maxWidth: '500px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                ...fadeIn,
                animationDelay: '0.1s',
                opacity: 0,
              }}>
                {s.desc}
              </p>

            {/* Brand pills if present */}
            {s.brands && (
              <div key={`b-${contentKey}`} style={{
                display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                marginBottom: '1.8rem',
                ...fadeIn,
                animationDelay: '0.15s',
                opacity: 0,
                direction: 'ltr',
              }}>
                {s.brands.map((brand, i) => (
                  <span key={i} style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.78rem', fontWeight: 700,
                    color: s.accent,
                    background: `${s.accent}12`,
                    border: `1px solid ${s.accent}30`,
                    borderRadius: '8px',
                    padding: '0.3rem 0.7rem',
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                  }}>
                    {brand}
                  </span>
                ))}
              </div>
            )}

            {/* Price tags if present (animated) */}
            {s.prices && (
              <div key={`p-${contentKey}`} style={{
                display: 'flex', flexWrap: 'wrap', gap: '1rem',
                ...fadeIn,
                animationDelay: '0.2s',
                opacity: 0,
              }}>
                {s.prices.map((p, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '0.6rem 1rem',
                    display: 'flex', flexDirection: 'column', gap: '0.2rem',
                  }}>
                    <span style={{
                      fontFamily: "'Tajawal', sans-serif",
                      fontSize: '0.88rem', fontWeight: 700, color: '#F9A8D4',
                    }}>
                      {p.label}
                    </span>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF',
                      direction: 'ltr',
                    }}>
                      {p.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
            </div>

            {/* ─── Navigation Controls ─── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              marginTop: '0.5rem',
            }}>
              {/* Next arrow (→ on right in RTL) */}
              <ArrowBtn direction="next" onClick={next} accent={s.accent} />
              {/* Prev arrow (← on left in RTL) */}
              <ArrowBtn direction="prev" onClick={prev} accent={s.accent} />

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Progress dot indicators */}
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', direction: 'ltr' }}>
                {SERVICES.map((srv, i) => (
                  <button
                    key={srv.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to service ${i + 1}`}
                    style={{
                      width: i === active ? '36px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i === active ? 'transparent' : 'rgba(255,255,255,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                      position: 'relative',
                      overflow: 'hidden',
                      outline: 'none',
                    }}
                  >
                    {/* Active dot: smooth CSS progress fill */}
                    {i === active && (
                      <>
                        <div style={{
                          position: 'absolute', inset: 0,
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.15)',
                        }} />
                        <div key={contentKey} style={{
                          position: 'absolute', top: 0, right: 0, bottom: 0,
                          borderRadius: '4px',
                          background: srv.accent,
                          animation: `progressFill ${DURATION}ms linear forwards`,
                        }} />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

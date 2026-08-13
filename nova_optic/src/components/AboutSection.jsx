import { useState, useEffect, useCallback } from 'react'

const INTERIORS = [
  '/shopimage/shopimage5.jpg',
  '/shopimage/shopimage2.jpg',
  '/shopimage/shopimage1.jpg',
  '/shopimage/shopimage7.jpg',
  '/shopimage/shopimage3.jpg',
  '/shopimage/shopimage6.jpg',
  '/shopimage/shopimage4.jpg',
]

export default function AboutSection() {
  const [current, setCurrent] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const next = useCallback(() => setCurrent(i => (i + 1) % INTERIORS.length), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + INTERIORS.length) % INTERIORS.length), [])

  useEffect(() => {
    const t = setInterval(next, 3500)
    return () => clearInterval(t)
  }, [next])

  const onDragStart = (clientX) => {
    setTouchEnd(null)
    setTouchStart(clientX)
    setIsDragging(true)
  }

  const onDragMove = (clientX) => {
    if (isDragging) setTouchEnd(clientX)
  }

  const onDragEnd = () => {
    setIsDragging(false)
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) next()
    if (distance < -50) prev()
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <>
      <style>{`
        .about-grid {
          display: flex;
          gap: 5rem;
          max-width: 1100px;
          margin: 0 auto;
          align-items: center;
        }
        .about-images-col {
          flex: 0 0 44%;
          position: relative;
          min-height: 550px;
        }
        .about-text-col {
          flex: 1;
        }
        .about-main-image {
          position: absolute;
          top: 0; right: 0;
          width: 85%;
        }
        .about-carousel-box {
          position: absolute;
          bottom: -2rem;
          left: 0;
          width: 55%;
          aspect-ratio: 1/1;
        }

        @media (max-width: 768px) {
          .about-grid {
            flex-direction: column;
            gap: 2rem;
          }
          .about-images-col {
            flex: none;
            width: 100%;
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .about-main-image {
            position: relative;
            top: auto; right: auto;
            width: 100%;
          }
          .about-carousel-box {
            position: relative;
            bottom: auto;
            left: auto;
            width: 100%;
            aspect-ratio: 16/10;
          }
          .about-text-col {
            width: 100%;
          }
        }
      `}</style>

      <section
        id="about"
        dir="rtl"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 5%',
          background: '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* Top separator line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #E2E8F0, transparent)',
        }} />

        <div className="about-grid">

          {/* ─── IMAGES: Overlapping Composition ─── */}
          <div className="about-images-col">

            {/* Main shop exterior */}
            <div className="about-main-image" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
            }}>
              <img
                src="/shopimage/shopimage.jpg"
                alt="Nova Optic storefront"
                style={{
                  width: '100%', display: 'block',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                }}
              />
              {/* Name overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '3rem 1.5rem 2.5rem',
                background: 'linear-gradient(0deg, rgba(15,23,42,0.85) 0%, transparent 100%)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.7rem',
                }}>
                  <img src="/logo.jpg" alt="" style={{
                    width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }} />
                  <div>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF',
                      direction: 'ltr', lineHeight: 1.2,
                    }}>
                      NOVA OPTIC
                    </p>
                    <p style={{
                      fontFamily: "'Tajawal', sans-serif",
                      fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                    }}>
                      أخصائي البصريات
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interior mini-carousel */}
            <div
              className="about-carousel-box"
              onTouchStart={(e) => onDragStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => onDragMove(e.targetTouches[0].clientX)}
              onTouchEnd={onDragEnd}
              onMouseDown={(e) => onDragStart(e.clientX)}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 24px 48px rgba(15,23,42,0.15), 0 0 0 8px #FFFFFF',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                touchAction: 'pan-y',
              }}
            >
              {INTERIORS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Interior"
                  draggable="false"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: i === current ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                  }}
                />
              ))}

              {/* Gradient for dots visibility */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
              }} />

              {/* Dots */}
              <div style={{
                position: 'absolute', bottom: '0.8rem', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', gap: '0.3rem', direction: 'ltr',
              }}>
                {INTERIORS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? '16px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i === current ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      outline: 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Story ─── */}
          <div className="about-text-col">

            {/* Label */}
            <p style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '0.9rem', fontWeight: 700,
              letterSpacing: '0.2em', color: '#0284C7',
              marginBottom: '1rem',
            }}>
              من نحن
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 800, color: '#0F172A',
              lineHeight: 1.5,
              marginBottom: '1.5rem',
            }}>
              شغف واحد منذ أكثر من 15 سنة —
              <br />
              <span style={{ color: '#0284C7' }}>أن نمنحك أفضل رؤية ممكنة</span>
            </h2>

            {/* Story */}
            <p style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '1.05rem', fontWeight: 500,
              color: '#64748B',
              lineHeight: 2.2,
              marginBottom: '1rem',
            }}>
              بدأ Nova Optic كمحل صغير بحلم كبير. اليوم، بفضل العمل الجاد والاهتمام بكل
              تفصيلة، أصبحنا وجهة موثوقة لمئات العائلات. نختار كل إطار بعناية من أرقى
              الماركات العالمية، ونستخدم أحدث التقنيات الألمانية في تركيب العدسات.
            </p>

            <p style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '1.05rem', fontWeight: 500,
              color: '#64748B',
              lineHeight: 2.2,
              marginBottom: '2.5rem',
            }}>
              نؤمن أن النظارة ليست مجرد أداة طبية — بل هي جزء من شخصيتك. لذلك خصصنا
              ركناً مميزاً للأطفال، ونوفر عدسات لاصقة بجميع أنواعها، لأن صحة بصرك
              تستحق الأفضل.
            </p>

            {/* Hours badge — compact single line */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '1.2rem',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '1rem 1.5rem',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(2,132,199,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontSize: '0.9rem', fontWeight: 800, color: '#0F172A',
                  marginBottom: '0.15rem',
                }}>
                  كل يوم من 09:00 صباحاً حتى 20:00 مساءً
                </p>
                <p style={{
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '0.82rem', fontWeight: 600, color: '#EF4444',
                }}>
                  ما عدا يوم الجمعة — مغلق
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function ContactSection() {
  const SOCIALS = [
    {
      name: 'فيسبوك',
      url: 'https://www.facebook.com/NOVAOPTIC16',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.77,7.46H14.5v-1.9c0-1.2.64-1.85,2-1.85H18.23V.26L14.73.23C10.87.23,9.08,2.2,9.08,5.85v1.61H6.18v4.11H9.08v11.96h5.42V11.57h3.81l.46-4.11Z" />
        </svg>
      )
    },
    {
      name: 'إنستغرام',
      url: 'https://www.instagram.com/nova___optic/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'ثردز',
      url: 'https://www.threads.com/@nova___optic',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2 2 6.5 2 12z" />
          <path d="M14 10.5c-1-1-2.5-1.5-4-1.5-3 0-5.5 2.5-5.5 5.5 0 2 1 3.5 2.5 4.5" />
          <path d="M9.5 13.5c1.5 1.5 4 1.5 5.5 0" />
          <path d="M15 13.5v-3c0-1.5-1-2.5-2.5-2.5" />
        </svg>
      )
    },
    {
      name: 'تيكتوك',
      url: 'https://www.tiktok.com/@nova.optic?_r=1&_t=ZS-98qioeEmWRg',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.5 5.54-3.8 7.15-2.3 1.63-5.46 2.05-8.08 1.18-2.67-.88-4.78-3.08-5.32-5.83-.54-2.73.18-5.65 1.83-7.8 1.65-2.14 4.31-3.4 7.02-3.41V12.1c-1.35.04-2.72.39-3.79 1.25-1.07.86-1.74 2.19-1.85 3.56-.11 1.37.38 2.79 1.29 3.84 1.16 1.34 3.19 1.76 4.88 1.1 1.65-.64 2.74-2.22 2.85-3.98.24-4.8.1-9.61.16-14.41l.03-3.44z" />
        </svg>
      )
    }
  ]

  return (
    <>
      <style>{`
        .footer-link {
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
          margin-bottom: 0.8rem;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .footer-link:hover {
          color: #38BDF8;
        }
        .social-circle {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #1E293B;
          display: flex; align-items: center; justify-content: center;
          color: #38BDF8;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-circle:hover {
          background: #38BDF8;
          color: #0F172A;
          transform: translateY(-2px);
        }
        .contact-map-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          align-items: center;
        }
        .footer-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .footer-bottom-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .contact-map-grid {
            grid-template-columns: 1fr;
          }
          .footer-columns {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.8rem;
          }
          .footer-top-row {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
            gap: 1.5rem !important;
          }
        }
      `}</style>

      {/* ─── SECTION 1: MAP & DIRECT CONTACT ─── */}
      <section id="contact-map" dir="rtl" style={{ background: '#F8FAFC', padding: 'clamp(3rem, 6vw, 4rem) 5%' }}>
        <div className="contact-map-grid">

          {/* Text & Socials Info */}
          <div>
            <h2 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0F172A',
              marginBottom: '1rem',
            }}>
              تفضل بزيارتنا
            </h2>
            <p style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '1.05rem', fontWeight: 500, color: '#64748B',
              lineHeight: 1.8, marginBottom: '2rem',
            }}>
              نسعد باستقبالكم في مقرنا لاكتشاف أحدث التشكيلات من الإطارات والعدسات،
              والحصول على استشارة متخصصة من فريقنا.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-circle" style={{
                  width: '48px', height: '48px', background: '#FFFFFF', color: '#0284C7',
                  boxShadow: '0 4px 12px rgba(2,132,199,0.1)',
                }}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div style={{
              background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
              border: '1px solid #E2E8F0',
            }}>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '0.9rem', color: '#64748B', marginBottom: '0.3rem' }}>العنوان:</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                Cité douzi 3 villa 235, baba ezzouar, sorecal
              </p>
              <a href="https://maps.app.goo.gl/izCeWwtnHEJgEF1z9" target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: "'Tajawal', sans-serif", fontSize: '0.9rem', fontWeight: 700,
                color: '#0284C7', textDecoration: 'none',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                افتح في خرائط جوجل
              </a>
            </div>
          </div>

          {/* Map */}
          <div style={{
            borderRadius: '24px', overflow: 'hidden', height: 'clamp(280px, 40vw, 400px)',
            boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
            border: '6px solid #FFFFFF',
          }}>
            <iframe
              src="https://maps.google.com/maps?q=Cité%20douzi%203%20villa%20235%20baba%20ezzouar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

      {/* ─── SECTION 2: STANDARD CORPORATE FOOTER ─── */}
      <footer dir="rtl" style={{ background: '#0F172A', color: '#FFFFFF', paddingTop: '4rem', paddingBottom: '1.5rem', paddingLeft: '5%', paddingRight: '5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Top Row: Logo & Socials */}
          <div className="footer-top-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <img src="/logo.jpg" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px' }}>
                NOVA OPTIC
              </span>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-circle">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Middle Row: Links Columns */}
          <div className="footer-columns">

            {/* Column 1: Head Office */}
            <div>
              <h4 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#FFFFFF' }}>
                المقر الرئيسي
              </h4>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1rem', direction: 'ltr', textAlign: 'right' }}>
                Cité douzi 3 villa 235<br />
                baba ezzouar, sorecal<br />
                الجزائر
              </p>
              <a href="https://maps.app.goo.gl/izCeWwtnHEJgEF1z9" target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: "'Tajawal', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: '#38BDF8', textDecoration: 'none'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                موقع الفرع
              </a>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#FFFFFF' }}>
                خدماتنا
              </h4>
              <a href="#services" className="footer-link">عدسات طبية</a>
              <a href="#services" className="footer-link">نظارات أطفال</a>
              <a href="#services" className="footer-link">إطارات فاخرة</a>
              <a href="#services" className="footer-link">عدسات لاصقة</a>
            </div>

            {/* Column 3: Support / Contact */}
            <div>
              <h4 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#FFFFFF' }}>
                الدعم والمساعدة
              </h4>
              <a href="mailto:djamelguedjou@gmail.com" className="footer-link" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", direction: 'ltr', textAlign: 'right' }}>djamelguedjou@gmail.com</a>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '0.8rem', color: '#64748B', marginBottom: '0.2rem' }}>هاتف / واتساب:</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', color: '#FFFFFF', fontWeight: 600, direction: 'ltr', textAlign: 'right' }}>0551 31 71 79</p>
              </div>
            </div>

          </div>

          {/* Bottom Row: Copyright */}
          <div className="footer-bottom-row">
            <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '0.85rem', color: '#64748B' }}>
              جميع الحقوق محفوظة © {new Date().getFullYear()} نوفا أوبتيك.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '0.85rem', color: '#64748B', direction: 'ltr' }}>
                Developed by <a href="https://mnwrameur.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#0EA5E9', textDecoration: 'none', fontWeight: 600 }}>ameur mohammed menouer</a>
              </span>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

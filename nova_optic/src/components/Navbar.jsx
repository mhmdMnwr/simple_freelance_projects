import { useState, useEffect } from 'react'

export default function Navbar() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const LINKS = [
    { id: 'hero', label: 'الرئيسية', href: '#' },
    { id: 'services', label: 'خدماتنا', href: '#services' },
    { id: 'about', label: 'من نحن', href: '#about' },
    { id: 'contact-map', label: 'تواصل معنا', href: '#contact-map' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = LINKS.map(l => l.id).filter(id => id !== 'hero')
      let current = ''

      if (window.scrollY < 200) {
        setActive('hero')
        return
      }

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section
          }
        }
      }

      if (current) setActive(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close)
    return () => window.removeEventListener('scroll', close)
  }, [])

  return (
    <>
      <style>{`
        .nav-pill {
          position: fixed;
          top: 1.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 2px solid #FFFFFF;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
          border-radius: 100px;
          padding: 0.5rem 0.5rem 0.5rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .nav-pill {
            width: 92%;
            padding: 0.4rem 0.6rem 0.4rem 0.6rem;
            gap: 0;
            justify-content: space-between;
          }
          .nav-links-desktop {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .nav-hamburger {
            display: none !important;
          }
          .nav-mobile-dropdown {
            display: none !important;
          }
        }
        
        .nav-link {
          font-family: 'Noto Kufi Arabic', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 0.4rem 0;
        }
        
        .nav-link:hover {
          color: #0F172A;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #0284C7;
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .nav-logo-container {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #FFFFFF;
          padding: 0.4rem 1rem 0.4rem 0.4rem;
          border-radius: 100px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .nav-hamburger {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(2, 132, 199, 0.08);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .nav-hamburger:hover {
          background: rgba(2, 132, 199, 0.15);
        }

        .nav-mobile-dropdown {
          position: fixed;
          top: 4.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 88%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 2px solid #FFFFFF;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          padding: 1rem;
          z-index: 998;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          animation: dropIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .nav-mobile-link {
          font-family: 'Noto Kufi Arabic', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
          text-decoration: none;
          padding: 0.8rem 1rem;
          border-radius: 14px;
          transition: background 0.2s ease;
          display: block;
          text-align: right;
        }
        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          background: rgba(2, 132, 199, 0.08);
          color: #0284C7;
        }
      `}</style>

      <nav className="nav-pill" dir="rtl">
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <div className="nav-logo-container">
            <img
              src="/logo.jpg"
              alt="Nova Optic"
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.95rem', fontWeight: 800, color: '#0F172A',
              letterSpacing: '0.5px'
            }}>
              NOVA OPTIC
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`nav-link ${active === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="nav-mobile-dropdown" dir="rtl">
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`nav-mobile-link ${active === link.id ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

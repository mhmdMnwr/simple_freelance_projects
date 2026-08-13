export default function FloatingContact() {
  return (
    <>
      <style>{`
        .fab-container {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 999;
        }
        .fab-button {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #0F172A;
          color: #FFFFFF;
          padding: 0.8rem 1.2rem;
          border-radius: 100px;
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .fab-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 35px rgba(2, 132, 199, 0.3);
          background: #0284C7;
          border-color: #38BDF8;
        }
        .fab-button svg {
          transition: transform 0.3s ease;
        }
        .fab-button:hover svg {
          transform: rotate(-10deg);
        }
        
        /* Pulse animation for attention */
        @keyframes fabPulse {
          0% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(2, 132, 199, 0); }
          100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0); }
        }
        .fab-button {
          animation: fabPulse 3s infinite;
        }
        
        @media (max-width: 768px) {
          .fab-container {
            bottom: calc(1.5rem + env(safe-area-inset-bottom));
            left: calc(1.5rem + env(safe-area-inset-left));
          }
          .fab-text {
            display: none;
          }
          .fab-button {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="fab-container" dir="rtl">
        <a 
          href="https://www.facebook.com/NOVAOPTIC16" 
          target="_blank" 
          rel="noreferrer" 
          className="fab-button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.77,7.46H14.5v-1.9c0-1.2.64-1.85,2-1.85H18.23V.26L14.73.23C10.87.23,9.08,2.2,9.08,5.85v1.61H6.18v4.11H9.08v11.96h5.42V11.57h3.81l.46-4.11Z" />
          </svg>
          <span className="fab-text" style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 800,
          }}>
            تواصل معنا
          </span>
        </a>
      </div>
    </>
  )
}

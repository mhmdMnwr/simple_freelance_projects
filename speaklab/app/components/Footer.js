import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Left Column: Brand */}
        <div className="footer-brand-col">
          <div className="footer-brand">
            <Image src="/logo.jpg" alt="speakLab" width={40} height={40} className="footer-logo" />
            <span className="footer-name">مدرسة speakLab</span>
          </div>
          <p className="footer-desc">
            نحن هنا لنقدم لك قيمة حقيقية من خلال خبرتنا، وليس مجرد خدمات تعليمية. نسعى دائماً للتميز والتفوق.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/profile.php?id=100083395694424" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="https://www.instagram.com/speaklabdz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.tiktok.com/@speaklabdz" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          </div>
        </div>

        {/* Middle Column: Contact */}
        <div className="footer-contact-col">
          <div className="fc-item">
            <strong>العنوان:</strong>
            <a
              href="https://www.google.com/maps/search/المنطقة+الثامنة،+نهج+جمال+عبد+الناصر"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: 'inherit' }}
            >
              المنطقة الثامنة، نهج جمال عبد الناصر
            </a>
          </div>
          <div className="fc-item">
            <strong>الهاتف:</strong>
            <span dir="ltr">0563 73 31 56</span>
          </div>
        </div>

        {/* Right Column: Links */}
        <div className="footer-links-col">
          <h4 className="fl-title">المدرسة</h4>
          <ul className="fl-list">
            <li><a href="#about">من نحن</a></li>
            <li><a href="#features">مميزاتنا</a></li>
            <li><a href="#teachers">أساتذتنا</a></li>
            <li><a href="#timetable">البرنامج الزمني</a></li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} مدرسة speakLab — جميع الحقوق محفوظة</p>
        <p className="footer-credit" style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--gray-400)' }}>
          Developed by{' '}
          <a 
            href="https://mnwrameur.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--white)', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = 'var(--red)'}
            onMouseOut={(e) => e.target.style.color = 'var(--white)'}
          >
            Ameur Mohammed Menouer
          </a>
        </p>
      </div>
    </footer>
  );
}

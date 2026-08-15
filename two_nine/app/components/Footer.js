import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Left Column: Brand */}
        <div className="footer-brand-col">
          <div className="footer-brand" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image src="/logo.jpg" alt="TWO NINE Logo" width={60} height={60} className="footer-logo" style={{ borderRadius: '8px' }} />
            <span className="footer-name" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--white)', fontFamily: 'var(--font-heading)' }}>مدرسة TWO NINE</span>
          </div>
          <p className="footer-desc">
            نحن هنا لنقدم لك قيمة حقيقية من خلال خبرتنا، وليس مجرد خدمات تعليمية. نسعى دائماً للتميز والتفوق.
          </p>
          <div className="footer-social" style={{ display: 'flex', gap: '12px' }}>
            <a href="https://www.facebook.com/profile.php?id=61566188770049" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="https://www.instagram.com/school_29t" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.tiktok.com/@twonine.school" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          </div>
        </div>

        {/* Middle Column: Contact */}
        <div className="footer-contact-col">
          <div className="fc-item" style={{ marginBottom: '16px' }}>
            <strong>العنوان:</strong>
            <a
              href="https://www.bing.com/maps/search?v=2&pc=FACEBK&mid=8100&mkt=en-US&fbclid=IwY2xjawTsey5wZG9mAWV4dG4DYWVtAjEwAGJyaWQRMTZIVXY0N1cxWFRFYk43RXlzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEet29IqhNzU7lQVqB6z_87Fo6ETVBJoslIzNjaWsJ8Cbhw19G6Vxf2E52r7XQ_aem_Y-B7aM4HFu9riH0q49UmEw&FORM=FBKPL1&q=mascara+rue+boutabout+mohamed-rue+sidi+daoud%2C+Mascara%2C+Algeria%2C+29000&cp=35.404290%7E0.129325&lvl=16&style=r"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginTop: '4px', lineHeight: '1.5' }}
            >
              📍 قاضي مراح – أمام مسجد حاطب بن أبي بلتعة<br/>
              <span style={{ fontSize: '0.85rem', color: 'var(--gray-400)', direction: 'ltr', display: 'inline-block' }}>mascara rue boutabout mohamed-rue sidi daoud, Mascara, Algeria, 29000</span>
            </a>
          </div>
          <div className="fc-item">
            <strong>الهاتف:</strong>
            <div dir="ltr" style={{ display: 'flex', flexDirection: 'column', marginTop: '4px', gap: '4px', fontWeight: '600' }}>
              <span>0797 37 49 25</span>
              <span>0549 74 81 64</span>
            </div>
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
        <p>© {new Date().getFullYear()} مدرسة TWO NINE — جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}

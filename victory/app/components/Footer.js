import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Left Column: Brand */}
        <div className="footer-brand-col">
          <div className="footer-brand">
            <Image src="/victory_logo.jpg" alt="فيكتوري" width={40} height={40} className="footer-logo" />
            <span className="footer-name">مدرسة فيكتوري</span>
          </div>
          <p className="footer-desc">
            نحن هنا لنقدم لك قيمة حقيقية من خلال خبرتنا، وليس مجرد خدمات تعليمية. نسعى دائماً للتميز والتفوق.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/profile.php?id=100084066316025" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
          </div>
        </div>

        {/* Middle Column: Contact */}
        <div className="footer-contact-col">
          <div className="fc-item">
            <strong>العنوان:</strong>
            <a
              href="https://www.google.com/maps/search/24+avril,+Tighennif,+Algeria,+29200"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: 'inherit' }}
            >
              24 avril, Tighennif, Algeria, 29200
            </a>
          </div>
          <div className="fc-item">
            <strong>الهاتف:</strong>
            <span dir="ltr">0659 45 97 04</span>
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
        <p>© {new Date().getFullYear()} مدرسة فيكتوري — جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}

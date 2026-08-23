export default function Footer() {
  return (
    <footer className="l-footer">
      <div className="l-container">
        <div className="l-footer-grid">
          <div>
            <div className="l-footer-brand">أكاديمية <span className="gold">خطوة</span></div>
            <p className="l-footer-desc">نحن هنا لنقدم لك قيمة حقيقية من خلال خبرتنا. نسعى دائماً للتميز والتفوق في مجال التعليم.</p>
            <div className="l-footer-social">
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="l-footer-title">الأكاديمية</div>
            <div className="l-footer-links">
              <a href="#about">من نحن</a>
              <a href="#teachers">أساتذتنا</a>
              <a href="#timetable">البرنامج الزمني</a>
              <a href="#announcements">الإعلانات</a>
            </div>
          </div>
          <div>
            <div className="l-footer-title">تواصل معنا</div>
            <div className="l-footer-links">
              <span>📍 العنوان: يرجى التحديث</span>
              <span dir="ltr">📞 0555 00 00 00</span>
            </div>
          </div>
        </div>
        <div className="l-footer-bottom">
          © {new Date().getFullYear()} أكاديمية خطوة — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}

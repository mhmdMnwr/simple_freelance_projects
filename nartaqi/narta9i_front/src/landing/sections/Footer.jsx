export default function Footer() {
  return (
    <footer className="l-footer">
      <div className="l-container">
        <div className="l-footer-grid">
          <div>
            <div className="l-footer-brand">المنصة التعليمية <span className="gold">بالعلم نرتقي</span> أونلاين</div>
            <p className="l-footer-desc">بالعلم نرتقي نحو مستقبل أفضل. منصة تعليمية أونلاين تقدم تعليماً نوعياً ومتابعة مستمرة للتلاميذ.</p>
            <div className="l-footer-social">
              <a href="https://wa.me/213659395695" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61582881446403&rdid=PV1xg1wZVPc9M7rM" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://t.me/+35Xst4O_KC85OTg0" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="l-footer-title">المؤسسة</div>
            <div className="l-footer-links">
              <a href="#about">من نحن</a>
              <a href="#teachers">أساتذتنا</a>
              <a href="#timetable">البرنامج الدراسي</a>
              <a href="#announcements">الإعلانات</a>
              <a href="#register">التسجيل</a>
            </div>
          </div>
          <div>
            <div className="l-footer-title">تواصل معنا</div>
            <div className="l-footer-links">
              <span>📍 منصة تعليمية متاحة من أي مكان 🌍</span>
              <a href="tel:0659395695" dir="ltr">📞 0659 39 56 95</a>
              <a href="tel:0697983846" dir="ltr">📞 0697 98 38 46</a>
              <a href="https://wa.me/213659395695" target="_blank" rel="noopener noreferrer">💬 تواصل عبر واتساب</a>
            </div>
          </div>
        </div>
        <div className="l-footer-bottom">
          © {new Date().getFullYear()} المنصة التعليمية بالعلم نرتقي أونلاين — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}

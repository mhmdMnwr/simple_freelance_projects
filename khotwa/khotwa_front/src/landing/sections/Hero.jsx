export default function Hero() {
  return (
    <section className="l-hero" id="hero">
      <div className="l-hero-particle" style={{ width: 300, height: 300, top: '10%', right: '5%', background: 'rgba(212,165,55,0.08)' }} />
      <div className="l-hero-particle" style={{ width: 200, height: 200, bottom: '15%', left: '10%', background: 'rgba(124,58,237,0.08)', animationDelay: '3s' }} />
      <div className="l-hero-content">
        <div className="l-hero-badge">أكاديمية تعليمية رائدة</div>
        <h1>مع <span className="gold">خطوة</span><br />نبني مستقبل كل تلميذ</h1>
        <p className="l-hero-desc">
          نرافقك بخطة تعليمية متكاملة، وأساتذة متميزين، ومتابعة مستمرة لتحقيق أفضل النتائج الدراسية.
        </p>
        <div className="l-hero-btns">
          <a href="#register" className="l-btn-gold">سجل الآن</a>
          <a href="#about" className="l-btn-outline">اكتشف المزيد</a>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image";

export default function Hero({ onOpenModal }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image src="/hero-bg-29-bright.png" alt="مدرسة two nine" fill className="hero-bg-img" priority sizes="100vw" />
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge">أكاديمية تعليمية رائدة</div>
        <h1 className="hero-title">
          مستقبلك الدراسي<br />
          يبدأ <span className="hero-highlight">من هنا</span>
        </h1>
        <p className="hero-desc">
          في TWO NINE نرافقك بخطة تعليمية متكاملة، وأساتذة متميزين، ومتابعة مستمرة لتحقيق أفضل النتائج.
        </p>
        <div className="hero-cta-group">
          <button className="btn-hero btn-hero-primary" onClick={onOpenModal}>
            سجل الآن
          </button>
          <a href="#about" className="btn-hero btn-hero-secondary">
            اكتشف المزيد
          </a>
        </div>
      </div>

      {/* Elegant Floating Promo Card */}
      <button className="hero-promo-card" onClick={onOpenModal}>
        <div className="hpc-icon">🎁</div>
        <div className="hpc-content">
          <span className="hpc-title">عرض خاص للمسجلين الأوائل</span>
          <span className="hpc-offer">خصم 500 دج</span>
          <span className="hpc-subtext">لفترة محدودة فقط</span>
        </div>
      </button>
    </section>
  );
}

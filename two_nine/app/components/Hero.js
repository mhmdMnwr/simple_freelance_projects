import Image from "next/image";

const AIRTABLE_URL = "https://airtable.com/appHR3ubrvys3Kdps/shrQECOnanUVE83n6";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image src="/hero-bg-29-bright.png" alt="مدرسة two nine" fill className="hero-bg-img" priority sizes="100vw" />
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge">أكاديمية تعليمية رائدة</div>
        <h1 className="hero-title">
          في{" "}
          <span className="two-nine-text" style={{ display: 'inline-block', direction: 'ltr' }}>
            <span className="tn-two">two</span>
            <span className="tn-nine"> nine</span>
          </span>
          <br />
          نتوقع نجاح كل تلميذ
        </h1>
        <p className="hero-desc">
          في TWO NINE نرافقك بخطة تعليمية متكاملة، وأساتذة متميزين، ومتابعة مستمرة لتحقيق أفضل النتائج.
        </p>
        <div className="hero-cta-group">
          <a href={AIRTABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-hero btn-hero-primary">
            سجل الآن
          </a>
          <a href="#about" className="btn-hero btn-hero-secondary">
            اكتشف المزيد
          </a>
        </div>
      </div>

      {/* Elegant Floating Promo Card */}
      <a href={AIRTABLE_URL} target="_blank" rel="noopener noreferrer" className="hero-promo-card">
        <div className="hpc-icon">🎁</div>
        <div className="hpc-content">
          <span className="hpc-title">عرض خاص للمسجلين الأوائل</span>
          <span className="hpc-offer">خصم 500 دج</span>
          <span className="hpc-subtext">لفترة محدودة فقط</span>
        </div>
      </a>
    </section>
  );
}

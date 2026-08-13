import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image src="/hero-bg.jpg" alt="مدرسة فيكتوري" fill className="hero-bg-img" priority sizes="100vw" />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-accent"></div>
      <div className="hero-content">
        <p className="hero-welcome">أهلاً بكم في</p>
        <h1 className="hero-title">مدرسة فيكتوري</h1>
        <p className="hero-desc">
          تعليم متميز يجمع بين أفضل المناهج العالمية والقيم الأصيلة.
          اختر لأبنائك بيئة تعليمية تلهم وتبني المستقبل.
        </p>
        <div className="hero-cta">
          <a href="https://www.facebook.com/profile.php?id=100084066316025" target="_blank" rel="noopener noreferrer" className="btn-hero">
            <span>سجّل أبناءك الآن</span>
            <span className="btn-icon">←</span>
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-indicator-text">اكتشف المزيد</span>
        <div className="scroll-indicator-line"></div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

export default function Hero({ onRegisterClick }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image src="/hero-bg.jpg" alt="مدرسة speakLab" fill className="hero-bg-img" priority sizes="100vw" unoptimized={true} />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-accent"></div>
      <div className="hero-content">
        <p className="hero-welcome">أهلاً بكم في</p>
        <h1 className="hero-title">
          مدرسة{" "}
          <span className="speaklab-text">
            <span className="sl-speak">speak</span>
            <span className="sl-lab">lab</span>
          </span>
        </h1>
        <p className="hero-desc">
          تعليم متميز يجمع بين أفضل المناهج العالمية والقيم الأصيلة.
          اختر لأبنائك بيئة تعليمية تلهم وتبني المستقبل.
        </p>
        <div className="hero-cta">
          <button className="btn-hero" onClick={onRegisterClick}>
            <span>سجّل أبناءك الآن</span>
            <span className="btn-icon">←</span>
          </button>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-indicator-text">اكتشف المزيد</span>
        <div className="scroll-indicator-line"></div>
      </div>
    </section>
  );
}

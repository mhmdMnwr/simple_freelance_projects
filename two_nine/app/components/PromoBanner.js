"use client";

import { useState, useEffect } from "react";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) {
      document.body.classList.add("promo-hidden");
    } else {
      document.body.classList.remove("promo-hidden");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="promo-bar">
      <div className="promo-bar-inner">
        <span className="promo-bar-pulse"></span>
        <p className="promo-bar-text">
          🔥 عرض محدود — <strong>خصم 500 دج</strong> لأول المسجلين
          <a
            href="https://www.facebook.com/profile.php?id=100083395694424"
            target="_blank"
            rel="noopener noreferrer"
            className="promo-bar-cta"
          >
            سجّل الآن ←
          </a>
        </p>
        <button
          className="promo-bar-close"
          onClick={() => setVisible(false)}
          aria-label="إغلاق"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/school/schoolimage0.jpg",
  "/school/schoolimage1.jpg",
  "/school/schoolimage2.jpg",
  "/school/schoolimage3.jpg",
  "/school/schoolimage4.jpg",
  "/school/schoolimage5.jpg"
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Swipe every 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Next image
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      // Previous image
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="about" id="about">
      <div className="about-text">
        <p className="section-label">من نحن</p>
        <h2 className="section-title">مرحباً بكم في<br />مدرسة speakLab</h2>
        <p className="section-text">
          نقدّم دروس دعم مدرسي لجميع المستويات — من الابتدائي إلى الثانوي —
          في المواد الأساسية: رياضيات، فيزياء، علوم، ولغات. إلى جانب ذلك،
          نوفّر تكوينات في عدة لغات أجنبية (فرنسية، إنجليزية) لتعزيز مهارات
          الطلاب. نعتمد على أساليب شرح مبسّطة تضمن فهماً عميقاً للمادة، مع
          متابعة دائمة لكل طالب وتقارير دورية لأولياء الأمور.
        </p>
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-icon">📚</div>
            <div className="about-stat-label">دروس دعم لكل المستويات</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon">🌍</div>
            <div className="about-stat-label">تكوين في عدة لغات</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon">📝</div>
            <div className="about-stat-label">تحضير للامتحانات</div>
          </div>
        </div>
      </div>
      <div className="about-image">
        <div 
          className="about-carousel"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
          {images.map((src, idx) => (
            <div 
              key={idx}
              className={`about-slide ${idx === currentIndex ? "active" : ""}`}
            >
              <Image 
                src={src} 
                alt={`مدرسة speakLab ${idx + 1}`} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }} 
                draggable={false} 
              />
            </div>
          ))}
          <div className="about-carousel-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`about-dot ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`صورة ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { DEPARTMENTS } from "../data/teachers";

export default function TeachersCarousel() {
  const [activeDept, setActiveDept] = useState(0);
  const [activeTeacher, setActiveTeacher] = useState(0);
  const [slideDir, setSlideDir] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const dept = DEPARTMENTS[activeDept];
  const teacher = dept.teachers[activeTeacher];

  const goTeacher = useCallback(
    (dir) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setSlideDir(dir);
      setTimeout(() => {
        setActiveTeacher((prev) => {
          const len = dept.teachers.length;
          return (prev + dir + len) % len;
        });
        setSlideDir(0);
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating, dept.teachers.length]
  );

  const switchDept = (idx) => {
    setActiveDept(idx);
    setActiveTeacher(0);
    setSlideDir(0);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => goTeacher(1), 6000);
    return () => clearInterval(interval);
  }, [goTeacher]);

  return (
    <section className="teachers-section" id="teachers">
      {/* Soft Glow */}
      <div className="ts-glow" style={{ background: dept.color }}></div>

      <div className="ts-header fade-up">
        <p className="section-label section-label--center section-label--light">
          أساتذتنا
        </p>
        <h2 className="section-title section-title--center section-title--light">
          نخبة من الأساتذة ذوي خبرة واسعة في التدريس
        </h2>
      </div>

      {/* Department tabs */}
      <div className="ts-tabs fade-up">
        {DEPARTMENTS.map((d, i) => (
          <button
            key={d.id}
            className={`ts-tab ${activeDept === i ? "active" : ""}`}
            onClick={() => switchDept(i)}
            style={activeDept === i ? {
              borderColor: d.color,
              background: `${d.color}20`,
            } : {}}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Clean Carousel */}
      <div className="ts-carousel fade-up">
        {/* Right Arrow (Previous in RTL) */}
        <button className="ts-arrow" onClick={() => goTeacher(-1)} aria-label="السابق">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        {/* Card Container */}
        <div className={`ts-card-container ${slideDir === 1 ? "slide-out-left" : slideDir === -1 ? "slide-out-right" : ""}`}>
          <div className="ts-card">

            <div className="ts-card-img">
              <Image
                src={teacher.img}
                alt={teacher.name}
                width={400}
                height={500}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            </div>

            <div className="ts-card-info">
              <h3 className="ts-card-name">{teacher.name}</h3>
              <span className="ts-card-subject" style={{
                background: dept.color,
              }}>
                {teacher.sub || dept.label}
              </span>
            </div>
          </div>
        </div>

        {/* Left Arrow (Next in RTL) */}
        <button className="ts-arrow" onClick={() => goTeacher(1)} aria-label="التالي">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="ts-dots fade-up">
        {dept.teachers.map((_, i) => (
          <button
            key={i}
            className={`ts-dot ${activeTeacher === i ? "active" : ""}`}
            style={activeTeacher === i ? { background: dept.color } : {}}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setSlideDir(i > activeTeacher ? 1 : -1);
                setTimeout(() => {
                  setActiveTeacher(i);
                  setSlideDir(0);
                  setIsAnimating(false);
                }, 400);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}

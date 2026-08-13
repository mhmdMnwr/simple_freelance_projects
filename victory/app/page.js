"use client";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import TeachersCarousel from "./components/TeachersCarousel";
import Timetable from "./components/Timetable";
import Footer from "./components/Footer";

export default function Home() {
  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <About />
      {/* Stats banner */}
      <section className="stats-banner" id="stats">
        <div className="stats-inner fade-up">
          <div className="stat-item"><div className="stat-number">+<span>500</span></div><div className="stat-label">طالب وطالبة</div></div>
          <div className="stat-item"><div className="stat-number">+<span>30</span></div><div className="stat-label">معلم ومعلمة</div></div>
          <div className="stat-item"><div className="stat-number">+<span>5</span></div><div className="stat-label">سنة خبرة</div></div>
          <div className="stat-item"><div className="stat-number"><span>90</span>%</div><div className="stat-label">نسبة النجاح</div></div>
        </div>
      </section>

      <TeachersCarousel />
      <Timetable />

      <Footer />
    </>
  );
}

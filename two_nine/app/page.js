"use client";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Subjects from "./components/Subjects";
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
      <About />
      <Subjects />
      <TeachersCarousel />
      <Timetable />
      <Footer />
    </>
  );
}

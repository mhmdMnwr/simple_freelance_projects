"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import TeachersCarousel from "./components/TeachersCarousel";
import Timetable from "./components/Timetable";
import Footer from "./components/Footer";
import RegisterModal from "./components/RegisterModal";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = useCallback(() => setIsRegisterOpen(true), []);
  const closeRegister = useCallback(() => setIsRegisterOpen(false), []);

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
      <Navbar onRegisterClick={openRegister} />
      <Hero onRegisterClick={openRegister} />
      <Features />
      <About />

      <TeachersCarousel />
      <Timetable />

      <Footer />

      {/* Registration Modal */}
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
    </>
  );
}

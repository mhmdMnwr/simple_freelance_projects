"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Subjects from "./components/Subjects";
import TeachersCarousel from "./components/TeachersCarousel";
import Timetable from "./components/Timetable";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <About />
      <Subjects />
      <TeachersCarousel />
      <Timetable />
      <Footer />

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

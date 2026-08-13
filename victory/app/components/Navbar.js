"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar({ sticky }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is around the top/middle of the viewport
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Image src="/victory_logo.jpg" alt="فيكتوري" width={46} height={46} className="nav-logo" />
        <span className="nav-name">مدرسة <span>فيكتوري</span></span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#hero" className={activeSection === "hero" ? "active" : ""}>الرئيسية</a>
        </li>
        <li>
          <a href="#about" className={activeSection === "about" ? "active" : ""}>من نحن</a>
        </li>
        <li>
          <a href="#stats" className={activeSection === "stats" ? "active" : ""}>أرقامنا</a>
        </li>
        <li>
          <a href="#teachers" className={activeSection === "teachers" ? "active" : ""}>أساتذتنا</a>
        </li>
        <li>
          <a href="#timetable" className={activeSection === "timetable" ? "active" : ""}>البرنامج الزمني</a>
        </li>
      </ul>
      <a href="https://www.facebook.com/profile.php?id=100084066316025" target="_blank" rel="noopener noreferrer" className="btn-nav-register">تواصل معنا</a>
    </nav>
  );
}

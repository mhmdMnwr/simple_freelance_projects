"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AIRTABLE_URL = "https://airtable.com/appHR3ubrvys3Kdps/shrQECOnanUVE83n6";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`main-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          
          {/* Logo */}
          <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/logo.jpg" alt="Logo" width={40} height={40} style={{ borderRadius: '6px' }} />
            <span className="nav-name">
              <span className="two-nine-text">
                <span className="tn-two">two</span>
                <span className="tn-nine"> nine</span>
              </span>
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="nav-links desktop-only">
            <li>
              <a href="#hero" className={activeSection === "hero" ? "active" : ""}>الرئيسية</a>
            </li>
            <li>
              <a href="#about" className={activeSection === "about" ? "active" : ""}>عن المدرسة</a>
            </li>
            <li>
              <a href="#subjects" className={activeSection === "subjects" ? "active" : ""}>المواد</a>
            </li>
            <li>
              <a href="#teachers" className={activeSection === "teachers" ? "active" : ""}>الأساتذة</a>
            </li>
            <li>
              <a href="#timetable" className={activeSection === "timetable" ? "active" : ""}>البرامج</a>
            </li>
          </ul>

          {/* Desktop CTA & Hamburger */}
          <div className="nav-actions">
            <a href={AIRTABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-nav-register desktop-only">سجل الآن</a>
            <button className="hamburger-btn mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
             <span className="nav-name">
              مدرسة{" "}
              <span className="two-nine-text">
                <span className="tn-two">two</span>
                <span className="tn-nine"> nine</span>
              </span>
            </span>
            <button className="close-btn" onClick={closeMenu}>✕</button>
          </div>
          <ul className="mobile-nav-links">
            <li><a href="#hero" onClick={closeMenu}>الرئيسية</a></li>
            <li><a href="#about" onClick={closeMenu}>عن المدرسة</a></li>
            <li><a href="#subjects" onClick={closeMenu}>المواد</a></li>
            <li><a href="#teachers" onClick={closeMenu}>الأساتذة</a></li>
            <li><a href="#timetable" onClick={closeMenu}>البرامج</a></li>
          </ul>
          <div className="mobile-menu-footer">
             <a href={AIRTABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-nav-register mobile-cta" onClick={closeMenu}>سجل الآن</a>
          </div>
        </div>
        <div className="mobile-menu-backdrop" onClick={closeMenu}></div>
      </div>
    </>
  );
}

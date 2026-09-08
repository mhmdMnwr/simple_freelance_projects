import { useEffect, useCallback } from 'react'
import './landing.css'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Testimonials from './sections/Testimonials'
import Teachers from './sections/Teachers'
import Timetable from './sections/Timetable'
import Announcements from './sections/Announcements'
import Registration from './sections/Registration'
import Footer from './sections/Footer'

export default function LandingPage() {
  // Continuously observe new .fade-up elements as they appear
  const setupObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )

    // Observe existing elements
    document.querySelectorAll('.landing .fade-up:not(.visible)').forEach(el => observer.observe(el))

    // Watch for new elements added dynamically
    const mutation = new MutationObserver(() => {
      document.querySelectorAll('.landing .fade-up:not(.visible)').forEach(el => observer.observe(el))
    })
    mutation.observe(document.querySelector('.landing') || document.body, { childList: true, subtree: true })

    return () => { observer.disconnect(); mutation.disconnect() }
  }, [])

  useEffect(() => {
    const cleanup = setupObserver()
    return cleanup
  }, [setupObserver])

  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Teachers />
      <Timetable />
      <Announcements />
      <Registration />
      <Footer />
      <a href="https://wa.me/213659395695" target="_blank" rel="noopener noreferrer" className="l-whatsapp-float" aria-label="تواصل عبر واتساب">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </a>
    </div>
  )
}

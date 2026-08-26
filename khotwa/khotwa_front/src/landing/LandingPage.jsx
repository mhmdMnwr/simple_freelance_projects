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
    </div>
  )
}

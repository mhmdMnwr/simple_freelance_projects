import { useState, useEffect, useCallback } from 'react'
import { publicApi } from '../publicApi'

const MALE_FALLBACKS = [
  '/images/teachers/male_1.png',
  '/images/teachers/male_2.png',
  '/images/teachers/male_3.png',
  '/images/teachers/male_4.png',
  '/images/teachers/male_5.png',
  '/images/teachers/male_6.png',
]

const FEMALE_FALLBACKS = [
  '/images/teachers/female_1.png',
  '/images/teachers/female_2.png',
  '/images/teachers/female_3.png',
  '/images/teachers/female_4.png',
  '/images/teachers/female_5.png',
  '/images/teachers/female_6.png',
]

function getTeacherImage(teacher, index) {
  if (teacher.imageUrl) return teacher.imageUrl
  if (teacher.sex === 'Female') return FEMALE_FALLBACKS[index % FEMALE_FALLBACKS.length]
  return MALE_FALLBACKS[index % MALE_FALLBACKS.length]
}

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeSubject, setActiveSubject] = useState(null)

  const [activeTeacher, setActiveTeacher] = useState(0)
  const [slideDir, setSlideDir] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    publicApi.getTeachers().then(data => {
      setTeachers(data)
      const subjects = getSubjectTabs(data)
      if (subjects.length > 0) setActiveSubject(subjects[0])
    }).catch(() => { }).finally(() => setLoading(false))
  }, [])

  const getSubjectTabs = (data) => {
    const names = new Set()
    data.forEach(t => {
      (t.subjectIds || []).forEach(s => {
        if (s.name) names.add(s.name)
      })
    })
    return Array.from(names)
  }

  const subjectTabs = getSubjectTabs(teachers)

  const filtered = teachers.filter(t =>
    (t.subjectIds || []).some(s => s.name === activeSubject)
  )

  const switchSubject = (name) => {
    setActiveSubject(name)
    setActiveTeacher(0)
    setSlideDir(0)
  }

  const goTeacher = useCallback(
    (dir) => {
      if (isAnimating || filtered.length === 0) return
      setIsAnimating(true)
      setSlideDir(dir)
      setTimeout(() => {
        setActiveTeacher((prev) => {
          const len = filtered.length
          return (prev + dir + len) % len
        })
        setSlideDir(0)
        setIsAnimating(false)
      }, 400)
    },
    [isAnimating, filtered.length]
  )

  // Auto-slide
  useEffect(() => {
    if (filtered.length <= 1) return
    const interval = setInterval(() => goTeacher(1), 6000)
    return () => clearInterval(interval)
  }, [goTeacher, filtered.length])

  const teacher = filtered[activeTeacher]
  const img = teacher ? getTeacherImage(teacher, activeTeacher) : null

  return (
    <section className="l-teachers" id="teachers">
      <div className="l-container">
        <div className="l-teachers-header fade-up">
          <span className="l-section-label">أساتذتنا</span>
          <h2 className="l-section-heading">نخبة من الأساتذة ذوي خبرة واسعة</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: 40 }}>جاري التحميل...</div>
        ) : teachers.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: 40 }}>لا يوجد أساتذة حالياً</div>
        ) : (
          <>
            {/* Subject filter tabs */}
            {subjectTabs.length > 0 && (
              <div className="l-tt-tabs fade-up" style={{ marginBottom: 40 }}>
                {subjectTabs.map(name => (
                  <button
                    key={name}
                    className={`l-tt-tab ${activeSubject === name ? 'active' : ''}`}
                    onClick={() => switchSubject(name)}
                    style={activeSubject === name ? {} : { color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)', background: 'transparent' }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            {filtered.length > 0 && teacher && (
              <>
                <div className="ts-carousel fade-up">
                  {/* Right Arrow (Previous in RTL) */}
                  <button className="ts-arrow" onClick={() => goTeacher(-1)} aria-label="السابق" disabled={filtered.length <= 1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>

                  {/* Card Container */}
                  <div className={`ts-card-container ${slideDir === 1 ? "slide-out-left" : slideDir === -1 ? "slide-out-right" : ""}`}>
                    <div className="ts-card">
                      <div className="ts-card-img">
                        {img ? (
                          <img src={img} alt={teacher.name} />
                        ) : (
                          <div className="l-teacher-img-placeholder" style={{ height: '100%' }}>
                            <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
                              <circle cx="40" cy="30" r="16" fill="rgba(212,160,23,0.25)" />
                              <ellipse cx="40" cy="68" rx="26" ry="16" fill="rgba(212,160,23,0.15)" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="ts-card-info">
                        <h3 className="ts-card-name">الأساتذ {teacher.name}</h3>
                        <span className="ts-card-subject">
                          {activeSubject}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Left Arrow (Next in RTL) */}
                  <button className="ts-arrow" onClick={() => goTeacher(1)} aria-label="التالي" disabled={filtered.length <= 1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                </div>

                {/* Dots */}
                {filtered.length > 1 && (
                  <div className="ts-dots fade-up">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        className={`ts-dot ${activeTeacher === i ? "active" : ""}`}
                        onClick={() => {
                          if (!isAnimating) {
                            setIsAnimating(true)
                            setSlideDir(i > activeTeacher ? 1 : -1)
                            setTimeout(() => {
                              setActiveTeacher(i)
                              setSlideDir(0)
                              setIsAnimating(false)
                            }, 400)
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}

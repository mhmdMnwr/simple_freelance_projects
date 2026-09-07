import { useState, useEffect } from 'react'
import { api } from '../api'
import { Users, GraduationCap, BookOpen, CalendarClock, Megaphone, Layers } from 'lucide-react'

const stats = [
  { key: 'students', label: 'التلاميذ', icon: Users, color: 'green', fetch: () => api.getStudents() },
  { key: 'teachers', label: 'الأساتذة', icon: GraduationCap, color: 'blue', fetch: () => api.getTeachers() },
  { key: 'subjects', label: 'المواد', icon: BookOpen, color: 'purple', fetch: () => api.getSubjects() },
  { key: 'sessions', label: 'الحصص', icon: CalendarClock, color: 'orange', fetch: () => api.getSessions() },
  { key: 'announcements', label: 'الإعلانات', icon: Megaphone, color: 'cyan', fetch: () => api.getAnnouncements() },
  { key: 'levels', label: 'المستويات', icon: Layers, color: 'red', fetch: () => api.getLevels() },
]

export default function Dashboard() {
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const results = {}
      await Promise.allSettled(
        stats.map(async (s) => {
          try {
            const data = await s.fetch()
            results[s.key] = Array.isArray(data) ? data.length : 0
          } catch { results[s.key] = 0 }
        })
      )
      setCounts(results)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">مرحباً بك في <span>بالعلم نرتقي</span></h1>
      </div>
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={s.key} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className={`stat-card-icon ${s.color}`}>
              <s.icon size={22} />
            </div>
            <div className="stat-value">{loading ? '—' : (counts[s.key] ?? 0)}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { publicApi } from '../publicApi'

const DAYS_ORDER = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
const DAYS_MAP = {
  'Saturday': 'السبت',
  'Sunday': 'الأحد',
  'Monday': 'الإثنين',
  'Tuesday': 'الثلاثاء',
  'Wednesday': 'الأربعاء',
  'Thursday': 'الخميس',
  'Friday': 'الجمعة',
}

export default function Timetable() {
  const [sessions, setSessions] = useState([])
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeLevelId, setActiveLevelId] = useState(null)
  const [activeClassId, setActiveClassId] = useState(null)

  useEffect(() => {
    Promise.all([
      publicApi.getTimetable(),
      publicApi.getLevels()
    ]).then(([ttData, lvlsData]) => {
      setSessions(ttData)
      setLevels(lvlsData)
      if (lvlsData.length > 0) {
        setActiveLevelId(lvlsData[0]._id)
        if (lvlsData[0].classes?.length > 0) {
          setActiveClassId(lvlsData[0].classes[0]._id)
        }
      }
    }).catch(() => { }).finally(() => setLoading(false))
  }, [])

  const activeLevel = levels.find(l => String(l._id) === String(activeLevelId))

  // Filter sessions by selected class
  const filtered = sessions.filter(s => {
    const clsId = s.subjectId?.classId?._id || s.subjectId?.classId
    return String(clsId) === String(activeClassId)
  })

  // Group by day
  const grouped = {}
  filtered.forEach(s => {
    const rawDay = s.dayOfWeek || 'غير محدد'
    const day = DAYS_MAP[rawDay] || rawDay
    if (!grouped[day]) grouped[day] = []
    grouped[day].push(s)
  })

  // Sort days
  const sortedDays = Object.keys(grouped).sort((a, b) => {
    const ai = DAYS_ORDER.indexOf(a)
    const bi = DAYS_ORDER.indexOf(b)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  // Group sessions by time slot within a day (for collisions)
  const getTimeSlots = (daySessions) => {
    const slots = {}
    daySessions.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
    daySessions.forEach(s => {
      const key = `${s.startTime}-${s.endTime}`
      if (!slots[key]) slots[key] = []
      slots[key].push(s)
    })
    return Object.entries(slots).sort(([a], [b]) => a.localeCompare(b))
  }

  return (
    <section className="l-timetable" id="timetable">
      <div className="l-container">
        <div className="l-timetable-header fade-up">
          <span className="l-section-label">برنامج الدروس</span>
          <h2 className="l-section-heading">التوقيت الأسبوعي حسب القسم</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>جاري التحميل...</div>
        ) : levels.length === 0 ? (
          <div className="l-tt-empty">📋 لا توجد مستويات حالياً</div>
        ) : (
          <>
            {/* Level tabs */}
            <div className="l-tt-tabs fade-up" style={{ marginBottom: '15px' }}>
              {levels.map(lvl => (
                <button key={lvl._id} className={`l-tt-tab ${activeLevelId === lvl._id ? 'active' : ''}`}
                  onClick={() => { setActiveLevelId(lvl._id); setActiveClassId(lvl.classes?.[0]?._id || null) }}>
                  {lvl.name}
                </button>
              ))}
            </div>

            {/* Class tabs */}
            {activeLevel && activeLevel.classes && activeLevel.classes.length > 0 && (
              <div className="l-tt-tabs fade-up" style={{ marginBottom: '30px', gap: '8px' }}>
                {activeLevel.classes.map(cls => (
                  <button key={cls._id} className={`l-tt-tab ${activeClassId === cls._id ? 'active' : ''}`} style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                    onClick={() => setActiveClassId(cls._id)}>
                    {cls.name}
                  </button>
                ))}
              </div>
            )}

            <div className="l-tt-grid fade-up">
              {!activeClassId ? (
                <div className="l-tt-empty">📋 الرجاء اختيار قسم</div>
              ) : sortedDays.length === 0 ? (
                <div className="l-tt-empty">📋 لا توجد حصص لهذا القسم حالياً</div>
              ) : sortedDays.map(day => (
                <div className="l-tt-day-group" key={day}>
                  <div className="l-tt-day-label">{day}</div>
                  <div className="l-tt-sessions">
                    {getTimeSlots(grouped[day]).map(([timeKey, slotSessions]) => (
                      <div key={timeKey} className="l-tt-slot">
                        {slotSessions.map(s => {
                          const subjectName = s.subjectId?.name || ''
                          return (
                            <div className="l-tt-session" key={s._id}>
                              <div className="l-tt-time" dir="ltr">{s.startTime} - {s.endTime}</div>
                              <div className="l-tt-details">
                                <div className="l-tt-subject">
                                  <span className="l-tt-level-badge">{subjectName}</span>
                                </div>
                                <div className="l-tt-teacher">الأساتذ {s.teacherId?.name || '—'}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

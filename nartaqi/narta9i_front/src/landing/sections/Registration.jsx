import { useState, useEffect } from 'react'
import { publicApi } from '../publicApi'

export default function Registration() {
  const [levels, setLevels] = useState([])
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', sex: 'Male', phone: '', mainLevelId: '', classId: '', subjectIds: [] })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    publicApi.getLevels()
      .then(data => {
        console.log('[Registration] Levels loaded:', data)
        setLevels(data)
      })
      .catch(err => console.error('[Registration] Failed to load levels:', err))
  }, [])

  // Derived state
  const selectedLevel = levels.find(l => l._id === form.mainLevelId)
  const classes = selectedLevel?.classes || []
  const selectedClass = classes.find(c => c._id === form.classId)
  const subjects = selectedClass?.subjects || []

  const handleLevelChange = (id) => {
    console.log('[Registration] Level changed to:', id)
    const lvl = levels.find(l => l._id === id)
    console.log('[Registration] Found level:', lvl?.name, '- classes:', lvl?.classes?.length)
    setForm(f => ({ ...f, mainLevelId: id, classId: '', subjectIds: [] }))
  }

  const handleClassChange = (id) => {
    console.log('[Registration] Class changed to:', id)
    const lvl = levels.find(l => l._id === form.mainLevelId)
    const cls = lvl?.classes?.find(c => c._id === id)
    console.log('[Registration] Found class:', cls?.name, '- subjects:', cls?.subjects?.length, cls?.subjects?.map(s => s.name))
    setForm(f => ({ ...f, classId: id, subjectIds: [] }))
  }

  const toggleSubject = (id) => setForm(f => ({
    ...f,
    subjectIds: f.subjectIds.includes(id) ? f.subjectIds.filter(s => s !== id) : [...f.subjectIds, id]
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.age || !form.phone || !form.mainLevelId || form.subjectIds.length === 0) {
      setMsg({ type: 'error', text: 'يرجى ملء جميع الحقول المطلوبة' })
      return
    }
    setSaving(true); setMsg(null)
    try {
      const { classId, ...rest } = form
      await publicApi.registerStudent({ ...rest, age: Number(rest.age) })
      setMsg({ type: 'success', text: 'تم التسجيل بنجاح! سنتواصل معك قريباً ✅' })
      setForm({ firstName: '', lastName: '', age: '', sex: 'Male', phone: '', mainLevelId: '', classId: '', subjectIds: [] })
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'حدث خطأ أثناء التسجيل' })
    } finally { setSaving(false) }
  }

  return (
    <section className="l-register" id="register">
      <div className="l-container">
        <div className="l-register-header fade-up">
          <span className="l-section-label">التسجيل</span>
          <h2 className="l-section-heading">سجل الآن</h2>
          <p className="l-register-sub">سجل في المنصة التعليمية بالعلم نرتقي أونلاين واستفد من أفضل الدروس والمتابعة المستمرة.</p>
        </div>
        <form className="l-reg-card fade-up" onSubmit={handleSubmit}>
          <div className="l-reg-row">
            <div className="l-reg-group">
              <label className="l-reg-label">الاسم</label>
              <input className="l-reg-input" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="محمد" />
            </div>
            <div className="l-reg-group">
              <label className="l-reg-label">اللقب</label>
              <input className="l-reg-input" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="خليفي" />
            </div>
          </div>
          <div className="l-reg-row">
            <div className="l-reg-group">
              <label className="l-reg-label">العمر</label>
              <input className="l-reg-input" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="14" />
            </div>
            <div className="l-reg-group">
              <label className="l-reg-label">الجنس</label>
              <select className="l-reg-select" value={form.sex} onChange={e => setForm({...form, sex: e.target.value})}>
                <option value="Male">ذكر</option>
                <option value="Female">أنثى</option>
              </select>
            </div>
          </div>
          <div className="l-reg-group">
            <label className="l-reg-label">رقم الهاتف</label>
            <input className="l-reg-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="0555123456" style={{ direction: 'ltr', textAlign: 'right' }} />
          </div>
          <div className="l-reg-group">
            <label className="l-reg-label">المستوى</label>
            <select className="l-reg-select" value={form.mainLevelId} onChange={e => handleLevelChange(e.target.value)}>
              <option value="">اختر المستوى</option>
              {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
          </div>

          {form.mainLevelId && (
            <div className="l-reg-group">
              <label className="l-reg-label">القسم</label>
              <select className="l-reg-select" value={form.classId} onChange={e => handleClassChange(e.target.value)}>
                <option value="">اختر القسم</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
          )}

          {form.classId && (
            <div className="l-reg-group">
              <label className="l-reg-label">المواد {subjects.length > 0 && <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>({subjects.length} مواد متاحة)</span>}</label>
              <div className="l-reg-chips">
                {subjects.length === 0 ? (
                  <span className="l-reg-hint">لا توجد مواد لهذا القسم</span>
                ) : subjects.map(s => (
                  <div key={s._id} className={`l-reg-chip ${form.subjectIds.includes(s._id) ? 'active' : ''}`} onClick={() => toggleSubject(s._id)}>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="l-btn-gold l-reg-submit" disabled={saving}>
            {saving ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
          </button>
          {msg && <div className={`l-reg-msg ${msg.type}`}>{msg.text}</div>}
        </form>
      </div>
    </section>
  )
}

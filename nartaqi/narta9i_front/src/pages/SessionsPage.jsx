import { useState, useEffect } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { Plus, Pencil, Trash2, Inbox } from 'lucide-react'

const DAYS = [
  { value: 'Sunday', label: 'الأحد' },
  { value: 'Monday', label: 'الإثنين' },
  { value: 'Tuesday', label: 'الثلاثاء' },
  { value: 'Wednesday', label: 'الأربعاء' },
  { value: 'Thursday', label: 'الخميس' },
  { value: 'Friday', label: 'الجمعة' },
  { value: 'Saturday', label: 'السبت' },
]

export default function SessionsPage() {
  const { data, loading, reload } = useCrud(api.getSessions)
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [levels, setLevels] = useState([])
  const [classes, setClasses] = useState([])
  const [modal, setModal] = useState(null)
  
  // Form includes levelId and classId for filtering, but they are not sent to the backend
  const [form, setForm] = useState({ dayOfWeek: 'Sunday', startTime: '', endTime: '', subjectId: '', teacherId: '', levelId: '', classId: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getSubjects().then(setSubjects).catch(() => {})
    api.getTeachers().then(setTeachers).catch(() => {})
    api.getLevels().then(setLevels).catch(() => {})
    api.getClasses().then(setClasses).catch(() => {})
  }, [])

  const openAdd = () => { setForm({ dayOfWeek: 'Sunday', startTime: '', endTime: '', subjectId: '', teacherId: '', levelId: '', classId: '' }); setModal('add') }
  const openEdit = (item) => {
    const sId = item.subjectId?._id || item.subjectId
    const subjectObj = subjects.find(s => s._id === sId)
    const levelId = subjectObj?.classId?.levelId?._id || subjectObj?.classId?.levelId || ''
    const classId = subjectObj?.classId?._id || subjectObj?.classId || ''
    setForm({
      dayOfWeek: item.dayOfWeek || 'Sunday',
      startTime: item.startTime || '',
      endTime: item.endTime || '',
      subjectId: sId,
      teacherId: item.teacherId?._id || item.teacherId,
      levelId,
      classId
    })
    setModal({ edit: item })
  }
  const close = () => setModal(null)

  const handleTeacherChange = (teacherId) => {
    setForm(f => ({ ...f, teacherId, levelId: '', classId: '', subjectId: '' }))
  }

  const handleLevelChange = (levelId) => {
    setForm(f => ({ ...f, levelId, classId: '', subjectId: '' }))
  }

  const handleClassChange = (classId) => {
    setForm(f => ({ ...f, classId, subjectId: '' }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { levelId, classId, ...payload } = form
      if (modal === 'add') await api.createSession(payload)
      else await api.updateSession(modal.edit._id, payload)
      close(); reload()
    } catch {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteSession(id); reload() } catch {}
  }

  const getDayName = (val) => {
    const d = DAYS.find(d => d.value === val)
    return d ? d.label : val
  }

  const filteredClasses = classes.filter(c => {
    if (!form.levelId) return false
    const lId = c.levelId?._id || c.levelId
    return String(lId) === String(form.levelId)
  })

  // Filter subjects based on selected teacher and optionally level/class
  const filteredSubjects = subjects.filter(s => {
    if (!form.teacherId) return false
    const teacher = teachers.find(t => t._id === form.teacherId)
    if (!teacher) return false
    
    // Check if teacher teaches this subject (match by name instead of strict ID, because teachers are assigned subjects by unique names in the UI)
    const teacherHasSubject = (teacher.subjectIds || []).some(ts => {
      const assignedName = ts.name || subjects.find(sub => sub._id === (ts._id || ts))?.name;
      return assignedName === s.name;
    })
    if (!teacherHasSubject) return false

    // Check if subject matches class (if a class is selected)
    if (form.classId) {
      const sClassId = s.classId?._id || s.classId
      if (String(sClassId) !== String(form.classId)) return false
    } else if (form.levelId) {
      // Check if subject matches level (if only a level is selected)
      const sLevelId = s.classId?.levelId?._id || s.classId?.levelId
      if (String(sLevelId) !== String(form.levelId)) return false
    }

    return true
  })

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>الحصص</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة حصة</button>
      </div>
      <div className="table-container">
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          data.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا توجد حصص بعد</p></div> : (
            <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr><th>المادة</th><th>الأستاذ</th><th>اليوم</th><th>البداية</th><th>النهاية</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div><span className="badge badge-purple">{item.subjectId?.name || '—'}</span></div>
                      <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px'}}>
                        {item.subjectId?.classId?.levelId?.name} - {item.subjectId?.classId?.name}
                      </div>
                    </td>
                    <td style={{fontWeight:600,color:'var(--text-primary)'}}>{item.teacherId?.name || '—'}</td>
                    <td>{getDayName(item.dayOfWeek)}</td>
                    <td style={{direction:'ltr',textAlign:'right'}}>{item.startTime}</td>
                    <td style={{direction:'ltr',textAlign:'right'}}>{item.endTime}</td>
                    <td><div className="actions-cell">
                      <button className="btn-icon" onClick={() => openEdit(item)}><Pencil size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(item._id)}><Trash2 size={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )
        )}
      </div>
      {modal && (
        <Modal title={modal === 'add' ? 'إضافة حصة' : 'تعديل الحصة'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          
          <div className="form-group">
            <label className="form-label">الأستاذ</label>
            <select className="form-select" value={form.teacherId} onChange={e => handleTeacherChange(e.target.value)}>
              <option value="">اختر الأستاذ أولاً</option>
              {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">المستوى (اختياري)</label>
            <select className="form-select" value={form.levelId} onChange={e => handleLevelChange(e.target.value)} disabled={!form.teacherId}>
              <option value="">{form.teacherId ? 'كل المستويات' : 'اختر الأستاذ أولاً'}</option>
              {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">القسم (اختياري)</label>
            <select className="form-select" value={form.classId} onChange={e => handleClassChange(e.target.value)} disabled={!form.levelId}>
              <option value="">{form.levelId ? 'كل الأقسام' : 'اختر المستوى أولاً'}</option>
              {filteredClasses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">المادة</label>
            <select className="form-select" value={form.subjectId} onChange={e => setForm({...form, subjectId: e.target.value})} disabled={!form.teacherId}>
              <option value="">{form.teacherId ? 'اختر المادة' : 'اختر الأستاذ أولاً'}</option>
              {filteredSubjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">اليوم</label>
            <select className="form-select" value={form.dayOfWeek} onChange={e => setForm({...form, dayOfWeek: e.target.value})}>
              {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">وقت البداية</label>
              <input className="form-input" type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">وقت النهاية</label>
              <input className="form-input" type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

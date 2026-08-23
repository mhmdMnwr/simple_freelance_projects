import { useState, useEffect } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { Plus, Pencil, Trash2, Inbox } from 'lucide-react'

export default function StudentsPage() {
  const { data, loading, reload } = useCrud(api.getStudents)
  const [levels, setLevels] = useState([])
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', sex: 'Male', phone: '', mainLevelId: '', classId: '', subjectIds: [] })
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getLevels().then(setLevels).catch(() => {})
    api.getClasses().then(setClasses).catch(() => {})
    api.getSubjects().then(setSubjects).catch(() => {})
  }, [])

  // Filtered classes based on selected level
  const filteredClasses = classes.filter(c => {
    const cLevelId = c.levelId?._id || c.levelId
    return form.mainLevelId && String(cLevelId) === String(form.mainLevelId)
  })

  // Filtered subjects based on selected class
  const filteredSubjects = subjects.filter(s => {
    const sClassId = s.classId?._id || s.classId
    return form.classId && String(sClassId) === String(form.classId)
  })

  const openAdd = () => { setForm({ firstName: '', lastName: '', age: '', sex: 'Male', phone: '', mainLevelId: '', classId: '', subjectIds: [] }); setModal('add') }
  const openEdit = (item) => {
    // Derive classId from the first subject's classId if available
    const firstSubject = (item.subjectIds || []).find(s => s.classId)
    const classId = firstSubject?.classId?._id || firstSubject?.classId || ''
    setForm({
      firstName: item.firstName, lastName: item.lastName, age: item.age,
      sex: item.sex, phone: item.phone,
      mainLevelId: item.mainLevelId?._id || item.mainLevelId,
      classId,
      subjectIds: (item.subjectIds || []).map(s => s._id || s)
    })
    setModal({ edit: item })
  }
  const close = () => setModal(null)

  const toggleSubject = (id) => {
    setForm(f => ({ ...f, subjectIds: f.subjectIds.includes(id) ? f.subjectIds.filter(s => s !== id) : [...f.subjectIds, id] }))
  }

  const handleLevelChange = (levelId) => {
    setForm(f => ({ ...f, mainLevelId: levelId, classId: '', subjectIds: [] }))
  }

  const handleClassChange = (classId) => {
    setForm(f => ({ ...f, classId, subjectIds: [] }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Remove classId from payload since backend doesn't store it on student
      const { classId, ...rest } = form
      const payload = { ...rest, age: Number(rest.age) }
      if (modal === 'add') await api.createStudent(payload)
      else await api.updateStudent(modal.edit._id, payload)
      close(); reload()
    } catch {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteStudent(id); reload() } catch {}
  }

  const filtered = data.filter(s => `${s.firstName} ${s.lastName}`.includes(search))

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>التلاميذ</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة تلميذ</button>
      </div>
      <div className="table-container">
        <div className="table-toolbar">
          <input className="search-input" placeholder="بحث بالاسم..." value={search} onChange={e => setSearch(e.target.value)} />
          <span style={{color:'var(--text-muted)',fontSize:'0.82rem'}}>{data.length} تلميذ</span>
        </div>
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          filtered.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا يوجد تلاميذ</p></div> : (
            <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr><th>الاسم</th><th>اللقب</th><th>العمر</th><th>الجنس</th><th>الهاتف</th><th>المستوى</th><th>المواد</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item._id}>
                    <td style={{fontWeight:600,color:'var(--text-primary)'}}>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>{item.sex === 'Male' ? 'ذكر' : 'أنثى'}</td>
                    <td style={{direction:'ltr',textAlign:'right'}}>{item.phone}</td>
                    <td><span className="badge badge-green">{item.mainLevelId?.name || '—'}</span></td>
                    <td>{(item.subjectIds||[]).map(s => <span key={s._id||s} className="badge badge-blue" style={{marginLeft:4}}>{s.name||'—'}</span>)}</td>
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
        <Modal title={modal === 'add' ? 'إضافة تلميذ' : 'تعديل التلميذ'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">الاسم</label>
              <input className="form-input" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="محمد" />
            </div>
            <div className="form-group">
              <label className="form-label">اللقب</label>
              <input className="form-input" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="خليفي" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">العمر</label>
              <input className="form-input" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="14" />
            </div>
            <div className="form-group">
              <label className="form-label">الجنس</label>
              <select className="form-select" value={form.sex} onChange={e => setForm({...form, sex: e.target.value})}>
                <option value="Male">ذكر</option>
                <option value="Female">أنثى</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">رقم الهاتف</label>
            <input className="form-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="0555123456" style={{direction:'ltr',textAlign:'right'}} />
          </div>
          <div className="form-group">
            <label className="form-label">المستوى</label>
            <select className="form-select" value={form.mainLevelId} onChange={e => handleLevelChange(e.target.value)}>
              <option value="">اختر المستوى</option>
              {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">القسم</label>
            <select className="form-select" value={form.classId} onChange={e => handleClassChange(e.target.value)} disabled={!form.mainLevelId}>
              <option value="">{form.mainLevelId ? 'اختر القسم' : 'اختر المستوى أولاً'}</option>
              {filteredClasses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">المواد</label>
            <div className="checkbox-group">
              {!form.mainLevelId ? (
                <div style={{color:'var(--text-muted)', fontSize:'0.85rem', padding:'0.5rem'}}>اختر المستوى أولاً</div>
              ) : !form.classId ? (
                <div style={{color:'var(--text-muted)', fontSize:'0.85rem', padding:'0.5rem'}}>اختر القسم أولاً</div>
              ) : filteredSubjects.length === 0 ? (
                <div style={{color:'var(--text-muted)', fontSize:'0.85rem', padding:'0.5rem'}}>لا توجد مواد لهذا القسم</div>
              ) : filteredSubjects.map(s => (
                <div key={s._id} className={`checkbox-item ${form.subjectIds.includes(s._id) ? 'selected' : ''}`} onClick={() => toggleSubject(s._id)}>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

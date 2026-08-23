import { useState, useEffect } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { Plus, Pencil, Trash2, Inbox } from 'lucide-react'

export default function SubjectsPage() {
  const { data, loading, reload } = useCrud(api.getSubjects)
  const [levels, setLevels] = useState([])
  const [classes, setClasses] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name: '', levelId: '', classId: '' })
  const [saving, setSaving] = useState(false)
  const [filterLevelId, setFilterLevelId] = useState('')
  const [filterClassId, setFilterClassId] = useState('')

  useEffect(() => {
    api.getLevels().then(setLevels).catch(() => {})
    api.getClasses().then(setClasses).catch(() => {})
  }, [])

  // Filtered classes based on selected level
  const filteredClasses = classes.filter(c => {
    const cLevelId = c.levelId?._id || c.levelId
    return form.levelId && String(cLevelId) === String(form.levelId)
  })

  const filteredData = data.filter(item => {
    const itemClassId = item.classId?._id || item.classId
    const itemLevelId = item.classId?.levelId?._id || item.classId?.levelId
    
    if (filterLevelId && String(itemLevelId) !== String(filterLevelId)) return false
    if (filterClassId && String(itemClassId) !== String(filterClassId)) return false
    return true
  })

  const openAdd = () => { setForm({ name: '', levelId: '', classId: '' }); setModal('add') }
  const openEdit = (item) => {
    const classLevelId = item.classId?.levelId?._id || item.classId?.levelId || ''
    setForm({ 
      name: item.name, 
      levelId: classLevelId,
      classId: item.classId?._id || item.classId 
    }); 
    setModal({ edit: item }) 
  }
  const close = () => setModal(null)

  const handleLevelChange = (levelId) => {
    setForm(f => ({ ...f, levelId, classId: '' }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { levelId, ...payload } = form
      if (modal === 'add') await api.createSubject(payload)
      else await api.updateSubject(modal.edit._id, payload)
      close(); reload()
    } catch {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteSubject(id); reload() } catch {}
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>المواد</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة مادة</button>
      </div>
      <div className="filters-section" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select className="form-select" value={filterLevelId} onChange={e => { setFilterLevelId(e.target.value); setFilterClassId('') }}>
          <option value="">كل المستويات</option>
          {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
        </select>
        <select className="form-select" value={filterClassId} onChange={e => setFilterClassId(e.target.value)} disabled={!filterLevelId}>
          <option value="">{filterLevelId ? 'كل الأقسام' : 'اختر المستوى أولاً'}</option>
          {classes.filter(c => {
            const cLevelId = c.levelId?._id || c.levelId
            return String(cLevelId) === String(filterLevelId)
          }).map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div className="table-container">
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          filteredData.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا توجد مواد بعد</p></div> : (
            <table>
              <thead><tr><th>اسم المادة</th><th>المستوى</th><th>القسم</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {filteredData.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td><span className="badge badge-blue">{item.classId?.levelId?.name || '—'}</span></td>
                    <td><span className="badge badge-purple">{item.classId?.name || '—'}</span></td>
                    <td><div className="actions-cell">
                      <button className="btn-icon" onClick={() => openEdit(item)}><Pencil size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(item._id)}><Trash2 size={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
      {modal && (
        <Modal title={modal === 'add' ? 'إضافة مادة' : 'تعديل المادة'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          <div className="form-group">
            <label className="form-label">اسم المادة</label>
            <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="مثال: الرياضيات" />
          </div>
          <div className="form-group">
            <label className="form-label">المستوى</label>
            <select className="form-select" value={form.levelId} onChange={e => handleLevelChange(e.target.value)}>
              <option value="">اختر المستوى</option>
              {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">القسم</label>
            <select className="form-select" value={form.classId} onChange={e => setForm({...form, classId: e.target.value})} disabled={!form.levelId}>
              <option value="">{form.levelId ? 'اختر القسم' : 'اختر المستوى أولاً'}</option>
              {filteredClasses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </Modal>
      )}
    </div>
  )
}

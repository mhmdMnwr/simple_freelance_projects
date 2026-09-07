import { useState, useEffect } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { Plus, Pencil, Trash2, Inbox } from 'lucide-react'

export default function ClassesPage() {
  const { data, loading, reload } = useCrud(api.getClasses)
  const [levels, setLevels] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name: '', levelId: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { api.getLevels().then(setLevels).catch(() => {}) }, [])

  const openAdd = () => { setForm({ name: '', levelId: levels[0]?._id || '' }); setModal('add') }
  const openEdit = (item) => { setForm({ name: item.name, levelId: item.levelId?._id || item.levelId }); setModal({ edit: item }) }
  const close = () => setModal(null)

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'add') await api.createClass(form)
      else await api.updateClass(modal.edit._id, form)
      close(); reload()
    } catch {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteClass(id); reload() } catch {}
  }

  const getLevelName = (item) => item.levelId?.name || '—'

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>الأقسام</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة قسم</button>
      </div>
      <div className="table-container">
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          data.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا توجد أقسام بعد</p></div> : (
            <table>
              <thead><tr><th>اسم القسم</th><th>المستوى</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td><span className="badge badge-blue">{getLevelName(item)}</span></td>
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
        <Modal title={modal === 'add' ? 'إضافة قسم' : 'تعديل القسم'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          <div className="form-group">
            <label className="form-label">اسم القسم</label>
            <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="مثال: السنة الأولى" />
          </div>
          <div className="form-group">
            <label className="form-label">المستوى</label>
            <select className="form-select" value={form.levelId} onChange={e => setForm({...form, levelId: e.target.value})}>
              <option value="">اختر المستوى</option>
              {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
          </div>
        </Modal>
      )}
    </div>
  )
}

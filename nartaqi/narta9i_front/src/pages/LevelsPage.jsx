import { useState } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { Plus, Pencil, Trash2, Layers, Inbox } from 'lucide-react'

export default function LevelsPage() {
  const { data, loading, reload } = useCrud(api.getLevels)
  const [modal, setModal] = useState(null) // null | 'add' | {edit: item}
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const openAdd = () => { setName(''); setModal('add') }
  const openEdit = (item) => { setName(item.name); setModal({ edit: item }) }
  const close = () => setModal(null)

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'add') await api.createLevel({ name })
      else await api.updateLevel(modal.edit._id, { name })
      close(); reload()
    } catch {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteLevel(id); reload() } catch {}
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>المستويات</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة مستوى</button>
      </div>
      <div className="table-container">
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          data.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا توجد مستويات بعد</p></div> : (
            <table>
              <thead><tr><th>اسم المستوى</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td><span className="badge badge-green">{item.name}</span></td>
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
        <Modal title={modal === 'add' ? 'إضافة مستوى' : 'تعديل المستوى'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          <div className="form-group">
            <label className="form-label">اسم المستوى</label>
            <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: ابتدائي" />
          </div>
        </Modal>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { uploadToCloudinary } from '../utils/upload'
import { Plus, Pencil, Trash2, Inbox, Upload, Image as ImageIcon } from 'lucide-react'

export default function TeachersPage() {
  const { data, loading, reload } = useCrud(api.getTeachers)
  const [subjects, setSubjects] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name: '', sex: 'Male', subjectIds: [], imageUrl: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { api.getSubjects().then(setSubjects).catch(() => {}) }, [])

  const openAdd = () => { 
    setForm({ name: '', sex: 'Male', subjectIds: [], imageUrl: '' })
    setImageFile(null)
    setImagePreview('')
    setModal('add') 
  }
  
  const openEdit = (item) => {
    setForm({ 
      name: item.name, 
      sex: item.sex, 
      subjectIds: (item.subjectIds || []).map(s => s._id || s),
      imageUrl: item.imageUrl || ''
    })
    setImageFile(null)
    setImagePreview(item.imageUrl || '')
    setModal({ edit: item })
  }
  
  const close = () => setModal(null)

  const toggleSubject = (id) => {
    setForm(f => ({
      ...f,
      subjectIds: f.subjectIds.includes(id) ? f.subjectIds.filter(s => s !== id) : [...f.subjectIds, id]
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }


  const handleSave = async () => {
    setSaving(true)
    try {
      let finalImageUrl = form.imageUrl;
      
      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = { ...form, imageUrl: finalImageUrl };

      if (modal === 'add') await api.createTeacher(payload)
      else await api.updateTeacher(modal.edit._id, payload)
      
      close(); reload()
    } catch (err) {
      alert(err.message || 'حدث خطأ أثناء الحفظ');
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteTeacher(id); reload() } catch {}
  }

  const filtered = data.filter(t => t.name.includes(search))

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>الأساتذة</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة أستاذ</button>
      </div>
      <div className="table-container">
        <div className="table-toolbar">
          <input className="search-input" placeholder="بحث بالاسم..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          filtered.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا يوجد أساتذة</p></div> : (
            <table>
              <thead><tr><th>الصورة</th><th>الاسم</th><th>الجنس</th><th>المواد</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item._id}>
                    <td>
                      {item.imageUrl ? 
                        <img src={item.imageUrl} alt={item.name} style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}} /> : 
                        <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ImageIcon size={20} color="var(--text-muted)" /></div>
                      }
                    </td>
                    <td style={{fontWeight:600,color:'var(--text-primary)'}}>{item.name}</td>
                    <td>{item.sex === 'Male' ? 'ذكر' : 'أنثى'}</td>
                    <td>{(item.subjectIds || []).map(s => <span key={s._id||s} className="badge badge-purple" style={{marginLeft:4}}>{s.name||'—'}</span>)}</td>
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
        <Modal title={modal === 'add' ? 'إضافة أستاذ' : 'تعديل الأستاذ'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          
          <div className="form-group" style={{textAlign: 'center', marginBottom: '1.5rem'}}>
            <div style={{position: 'relative', display: 'inline-block'}}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border-color)'}} />
              ) : (
                <div style={{width: 100, height: 100, borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', border: '3px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)', cursor: 'pointer'}} onClick={() => document.getElementById('teacherImageInput').click()}>
                  <Upload size={24} />
                  <span style={{fontSize: '0.75rem', marginTop: 4}}>صورة</span>
                </div>
              )}
              {imagePreview && (
                <button 
                  className="btn-icon" 
                  style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)'}}
                  onClick={() => document.getElementById('teacherImageInput').click()}
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
            <input 
              id="teacherImageInput" 
              type="file" 
              accept="image/*" 
              style={{display: 'none'}} 
              onChange={handleImageChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">الاسم الكامل</label>
            <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="مثال: أحمد بن علي" />
          </div>
          <div className="form-group">
            <label className="form-label">الجنس</label>
            <select className="form-select" value={form.sex} onChange={e => setForm({...form, sex: e.target.value})}>
              <option value="Male">ذكر</option>
              <option value="Female">أنثى</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">المواد</label>
            <div className="checkbox-group">
              {subjects
                .filter((s, index, self) => index === self.findIndex((t) => t.name === s.name))
                .map(s => (
                <div key={s._id} className={`checkbox-item ${form.subjectIds.includes(s._id) ? 'selected' : ''}`} onClick={() => toggleSubject(s._id)}>
                  {s.name}
                </div>
              ))}
              {subjects.length === 0 && <p style={{color:'var(--text-muted)',fontSize:'0.82rem'}}>لا توجد مواد متاحة</p>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

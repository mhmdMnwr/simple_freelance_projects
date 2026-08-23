import { useState } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { Plus, Pencil, Trash2, Inbox, Upload, Image as ImageIcon, Calendar, X } from 'lucide-react'

export default function AnnouncementsPage() {
  const { data, loading, reload } = useCrud(api.getAnnouncements)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [viewItem, setViewItem] = useState(null)

  const openAdd = () => { 
    setForm({ title: '', description: '', imageUrl: '' })
    setImageFile(null)
    setImagePreview('')
    setModal('add') 
  }
  
  const openEdit = (item) => { 
    setForm({ title: item.title, description: item.description, imageUrl: item.imageUrl || '' })
    setImageFile(null)
    setImagePreview(item.imageUrl || '')
    setModal({ edit: item }) 
  }
  
  const close = () => setModal(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `timestamp=${timestamp}${apiSecret}`;
    
    const msgBuffer = new TextEncoder().encode(stringToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody?.error?.message || "فشل رفع الصورة");
    }
    const resData = await response.json();
    return resData.secure_url;
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      let finalImageUrl = form.imageUrl;
      
      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = { ...form, imageUrl: finalImageUrl };
      if (!payload.imageUrl) delete payload.imageUrl;

      if (modal === 'add') await api.createAnnouncement(payload)
      else await api.updateAnnouncement(modal.edit._id, payload)
      
      close(); reload()
    } catch (err) {
      alert(err.message || 'حدث خطأ أثناء الحفظ');
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteAnnouncement(id); reload() } catch {}
  }

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>الإعلانات</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة إعلان</button>
      </div>
      
      {loading ? (
        <div className="loading-container"><div className="spinner" /></div>
      ) : data.length === 0 ? (
        <div className="empty-state"><Inbox size={48} /><p>لا توجد إعلانات بعد</p></div>
      ) : (
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '1.5rem',
          paddingBottom: '2rem'
        }}>
          {data.map(item => (
            <div key={item._id} className="announcement-card" onClick={() => setViewItem(item)}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="announcement-img" />
              ) : (
                <div className="announcement-img-placeholder">
                  <ImageIcon size={48} opacity={0.5} />
                </div>
              )}
              
              <div className="announcement-body">
                <h3 className="announcement-title">{item.title}</h3>
                
                <div className="announcement-date">
                  <Calendar size={14} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                
                <p className="announcement-desc">
                  {item.description}
                </p>
                
                <div className="announcement-actions">
                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); openEdit(item) }}>
                    <Pencil size={18} />
                  </button>
                  <button className="btn-icon danger" onClick={(e) => { e.stopPropagation(); handleDelete(item._id) }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View full announcement modal */}
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
            {viewItem.imageUrl && (
              <img src={viewItem.imageUrl} alt={viewItem.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
            )}
            <div className="modal-header">
              <h2 className="modal-title" style={{ fontSize: '1.3rem', fontWeight: 800 }}>{viewItem.title}</h2>
              <button className="btn-icon" onClick={() => setViewItem(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Calendar size={15} color="var(--text-muted)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)' }}>{formatDate(viewItem.createdAt)}</span>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.92rem', 
                lineHeight: 1.85, 
                whiteSpace: 'pre-line',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                fontFamily: "'Cairo', sans-serif",
                margin: 0
              }}>
                {viewItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'إضافة إعلان' : 'تعديل الإعلان'} onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          
          <div className="form-group">
            <label className="form-label">صورة الإعلان</label>
            <div style={{position: 'relative', width: '100%', height: '200px', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '2px dashed var(--border)', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => document.getElementById('postImageInput').click()}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)'}}>
                  <Upload size={32} style={{marginBottom: '0.5rem'}} />
                  <span>اضغط لاختيار صورة</span>
                </div>
              )}
              {imagePreview && (
                <div style={{position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px', borderRadius: '4px', display: 'flex'}}>
                  <Pencil size={16} />
                </div>
              )}
            </div>
            <input 
              id="postImageInput" 
              type="file" 
              accept="image/*" 
              style={{display: 'none'}} 
              onChange={handleImageChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">العنوان</label>
            <input className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="عنوان الإعلان" />
          </div>
          
          <div className="form-group">
            <label className="form-label">الوصف</label>
            <textarea className="form-input" rows={6} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="تفاصيل الإعلان..." style={{resize:'vertical'}} />
          </div>
        </Modal>
      )}
    </div>
  )
}

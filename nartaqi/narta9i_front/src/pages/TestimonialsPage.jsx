import { useState, useEffect } from 'react'
import { api } from '../api'
import { useCrud } from '../hooks/useCrud'
import Modal from '../components/Modal'
import { uploadToCloudinary } from '../utils/upload'
import { Plus, Trash2, Inbox, Upload, Image as ImageIcon, Pencil } from 'lucide-react'

export default function TestimonialsPage() {
  const { data, loading, reload } = useCrud(api.getTestimonials)
  const [modal, setModal] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)

  const openAdd = () => { 
    setImageFile(null)
    setImagePreview('')
    setModal(true) 
  }
  
  const close = () => setModal(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (!imageFile) return alert('يرجى اختيار صورة أولاً')
    setSaving(true)
    try {
      const imageUrl = await uploadToCloudinary(imageFile);
      await api.createTestimonial({ imageUrl })
      close(); reload()
    } catch (err) {
      alert(err.message || 'حدث خطأ أثناء الحفظ');
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    try { await api.deleteTestimonial(id); reload() } catch {}
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title"><span>آراء الأولياء والتلاميذ</span></h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} />إضافة صورة</button>
      </div>
      
      <div className="table-container" style={{ padding: '2rem' }}>
        {loading ? <div className="loading-container"><div className="spinner" /></div> : (
          data.length === 0 ? <div className="empty-state"><Inbox size={48} /><p>لا توجد آراء حالياً</p></div> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {data.map(item => (
                <div key={item._id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', aspectRatio: '1/1' }}>
                  <img src={item.imageUrl} alt="Testimonial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    className="btn-icon danger" 
                    style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)' }}
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {modal && (
        <Modal title="إضافة رأي جديد" onClose={close}
          footer={<><button className="btn btn-primary" onClick={handleSave} disabled={saving || !imageFile}>{saving ? 'جاري الرفع...' : 'رفع الصورة'}</button><button className="btn btn-ghost" onClick={close}>إلغاء</button></>}>
          
          <div className="form-group" style={{textAlign: 'center', margin: '2rem 0'}}>
            <div style={{position: 'relative', display: 'inline-block'}}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{width: 200, height: 200, borderRadius: '8px', objectFit: 'contain', border: '2px solid var(--border-color)'}} />
              ) : (
                <div style={{width: 200, height: 200, borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)', cursor: 'pointer'}} onClick={() => document.getElementById('testimonialImageInput').click()}>
                  <Upload size={32} style={{ marginBottom: 8 }} />
                  <span style={{fontSize: '0.9rem'}}>انقر لاختيار صورة</span>
                </div>
              )}
              {imagePreview && (
                <button 
                  className="btn-icon" 
                  style={{position: 'absolute', bottom: -12, right: -12, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)'}}
                  onClick={() => document.getElementById('testimonialImageInput').click()}
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
            <input 
              id="testimonialImageInput" 
              type="file" 
              accept="image/*" 
              style={{display: 'none'}} 
              onChange={handleImageChange} 
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

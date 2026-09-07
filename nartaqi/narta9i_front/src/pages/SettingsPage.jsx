import { useState, useEffect } from 'react'
import { api } from '../api'
import { uploadToCloudinary } from '../utils/upload'
import { Lock, Eye, EyeOff, Check, Image as ImageIcon, Upload, Pencil } from 'lucide-react'

export default function SettingsPage() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [savingPass, setSavingPass] = useState(false)
  const [msgPass, setMsgPass] = useState(null)

  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [savingLogo, setSavingLogo] = useState(false)
  const [msgLogo, setMsgLogo] = useState(null)

  const [heroFile, setHeroFile] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [aboutFile, setAboutFile] = useState(null)
  const [aboutPreview, setAboutPreview] = useState('')
  const [savingCovers, setSavingCovers] = useState(false)
  const [msgCovers, setMsgCovers] = useState(null)

  useEffect(() => {
    api.getSettings()
      .then(data => {
        if (data && data.logoUrl) {
          setLogoPreview(data.logoUrl)
        } else {
          setLogoPreview('/logo.jpg')
        }
        
        if (data && data.heroBgUrl) setHeroPreview(data.heroBgUrl)
        else setHeroPreview('/images/hero_bg.png')
        
        if (data && data.aboutImgUrl) setAboutPreview(data.aboutImgUrl)
        else setAboutPreview('/images/school.png')
      })
      .catch(err => console.error('Failed to load settings:', err))
  }, [])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setMsgPass(null)

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setMsgPass({ type: 'error', text: 'يرجى ملء جميع الحقول' })
      return
    }
    if (form.newPassword.length < 6) {
      setMsgPass({ type: 'error', text: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل' })
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setMsgPass({ type: 'error', text: 'كلمة المرور الجديدة غير متطابقة' })
      return
    }

    setSavingPass(true)
    try {
      await api.changePassword(form.oldPassword, form.newPassword)
      setMsgPass({ type: 'success', text: 'تم تغيير كلمة المرور بنجاح ✅' })
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setMsgPass({ type: 'error', text: err.message || 'فشل تغيير كلمة المرور' })
    } finally {
      setSavingPass(false)
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleLogoSubmit = async (e) => {
    e.preventDefault()
    if (!logoFile) return

    setSavingLogo(true)
    setMsgLogo(null)
    try {
      const secureUrl = await uploadToCloudinary(logoFile)
      await api.updateLogo(secureUrl)
      setMsgLogo({ type: 'success', text: 'تم تحديث الشعار بنجاح ✅' })
      setLogoFile(null)
    } catch (err) {
      setMsgLogo({ type: 'error', text: err.message || 'فشل رفع الشعار' })
    } finally {
      setSavingLogo(false)
    }
  }

  const handleHeroChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setHeroFile(file)
      setHeroPreview(URL.createObjectURL(file))
    }
  }

  const handleAboutChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAboutFile(file)
      setAboutPreview(URL.createObjectURL(file))
    }
  }

  const handleCoversSubmit = async (e) => {
    e.preventDefault()
    if (!heroFile && !aboutFile) return

    setSavingCovers(true)
    setMsgCovers(null)
    try {
      let heroBgUrl, aboutImgUrl;
      if (heroFile) heroBgUrl = await uploadToCloudinary(heroFile)
      if (aboutFile) aboutImgUrl = await uploadToCloudinary(aboutFile)
      
      await api.updateCovers({ heroBgUrl, aboutImgUrl })
      setMsgCovers({ type: 'success', text: 'تم تحديث صور الغلاف بنجاح ✅' })
      setHeroFile(null)
      setAboutFile(null)
    } catch (err) {
      setMsgCovers({ type: 'error', text: err.message || 'فشل رفع صور الغلاف' })
    } finally {
      setSavingCovers(false)
    }
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1><Lock size={24} /> الإعدادات</h1>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gap: '2rem' }}>
        
        {/* Logo Settings */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ImageIcon size={18} /> شعار المؤسسة
          </h2>

          <form onSubmit={handleLogoSubmit}>
            <div className="form-group" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" style={{ height: 100, width: 'auto', borderRadius: '8px', objectFit: 'contain', border: '2px solid var(--border-color)', padding: 4 }} />
                ) : (
                  <div style={{ width: 100, height: 100, borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)' }}>
                    <ImageIcon size={24} />
                  </div>
                )}
                <button 
                  type="button"
                  className="btn-icon" 
                  style={{ position: 'absolute', bottom: -10, right: -10, backgroundColor: '#ffffff', color: '#1A1333', border: '1px solid #D4A537', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10 }}
                  onClick={() => document.getElementById('logoInput').click()}
                  title="تغيير الشعار"
                >
                  <Pencil size={16} />
                </button>
              </div>
              <input 
                id="logoInput" 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleLogoChange} 
              />
            </div>

            {msgLogo && (
              <div style={{
                padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600,
                background: msgLogo.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: msgLogo.type === 'success' ? '#10B981' : '#EF4444',
                border: `1px solid ${msgLogo.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
                {msgLogo.text}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={savingLogo || !logoFile} style={{ width: '100%' }}>
              {savingLogo ? 'جاري الرفع...' : <><Upload size={18} /> تحديث الشعار</>}
            </button>
          </form>
        </div>

        {/* Covers Settings */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ImageIcon size={18} /> صور الغلاف
          </h2>

          <form onSubmit={handleCoversSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
              {/* Hero Image */}
              <div className="form-group" style={{ textAlign: 'center' }}>
                <label className="form-label">خلفية الرئيسية</label>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                  <img src={heroPreview} alt="Hero Preview" style={{ width: '100%', height: 160, borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                  <button 
                    type="button"
                    className="btn-icon" 
                    style={{ position: 'absolute', bottom: -10, right: -10, backgroundColor: '#ffffff', color: '#1A1333', border: '1px solid #D4A537', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10 }}
                    onClick={() => document.getElementById('heroInput').click()}
                    title="تغيير صورة الرئيسية"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <input 
                  id="heroInput" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleHeroChange} 
                />
              </div>

              {/* About Image */}
              <div className="form-group" style={{ textAlign: 'center' }}>
                <label className="form-label">صورة من نحن</label>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                  <img src={aboutPreview} alt="About Preview" style={{ width: '100%', height: 160, borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                  <button 
                    type="button"
                    className="btn-icon" 
                    style={{ position: 'absolute', bottom: -10, right: -10, backgroundColor: '#ffffff', color: '#1A1333', border: '1px solid #D4A537', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10 }}
                    onClick={() => document.getElementById('aboutInput').click()}
                    title="تغيير صورة من نحن"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <input 
                  id="aboutInput" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleAboutChange} 
                />
              </div>
            </div>

            {msgCovers && (
              <div style={{
                padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600,
                background: msgCovers.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: msgCovers.type === 'success' ? '#10B981' : '#EF4444',
                border: `1px solid ${msgCovers.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
                {msgCovers.text}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={savingCovers || (!heroFile && !aboutFile)} style={{ width: '100%' }}>
              {savingCovers ? 'جاري الرفع...' : <><Upload size={18} /> تحديث الصور</>}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={18} /> تغيير كلمة المرور
          </h2>

          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label className="form-label">كلمة المرور الحالية</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showOld ? 'text' : 'password'}
                  value={form.oldPassword}
                  onChange={e => setForm({ ...form, oldPassword: e.target.value })}
                  placeholder="أدخل كلمة المرور الحالية"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">كلمة المرور الجديدة</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showNew ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={e => setForm({ ...form, newPassword: e.target.value })}
                  placeholder="أدخل كلمة المرور الجديدة"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">تأكيد كلمة المرور الجديدة</label>
              <input
                className="form-input"
                type="password"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="أعد إدخال كلمة المرور الجديدة"
              />
            </div>

            {msgPass && (
              <div style={{
                padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600,
                background: msgPass.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: msgPass.type === 'success' ? '#10B981' : '#EF4444',
                border: `1px solid ${msgPass.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
                {msgPass.text}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={savingPass} style={{ width: '100%' }}>
              {savingPass ? 'جاري الحفظ...' : <><Check size={18} /> حفظ كلمة المرور</>}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

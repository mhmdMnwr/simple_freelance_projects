import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { LogIn } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(username, password)
      localStorage.setItem('khotwa_token', data.access_token)
      navigate('/admin')
    } catch (err) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <div className="login-logo-icon" style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1>مؤسسة خطوة</h1>
          <p>لوحة تحكم المدرسة</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        <div className="form-group">
          <label className="form-label">اسم المستخدم</label>
          <input className="form-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required />
        </div>
        <div className="form-group">
          <label className="form-label">كلمة المرور</label>
          <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        <button className="btn btn-primary login-btn" type="submit" disabled={loading}>
          <LogIn size={18} />
          {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  )
}

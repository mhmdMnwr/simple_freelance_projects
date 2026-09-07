import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { LayoutDashboard, Users, GraduationCap, BookOpen, School, Layers, CalendarClock, Megaphone, Settings, LogOut, Image as ImageIcon } from 'lucide-react'

const mainNav = [
  { to: '/admin', icon: LayoutDashboard, label: 'الرئيسية', end: true },
]

const managementNav = [
  { to: '/admin/students', icon: Users, label: 'التلاميذ' },
  { to: '/admin/teachers', icon: GraduationCap, label: 'الأساتذة' },
  { to: '/admin/subjects', icon: BookOpen, label: 'المواد' },
  { to: '/admin/classes', icon: School, label: 'الأقسام' },
  { to: '/admin/levels', icon: Layers, label: 'المستويات' },
]

const scheduleNav = [
  { to: '/admin/sessions', icon: CalendarClock, label: 'الحصص' },
  { to: '/admin/announcements', icon: Megaphone, label: 'الإعلانات' },
  { to: '/admin/testimonials', icon: ImageIcon, label: 'آراء التلاميذ' },
]

function NavItems({ items, onClose }) {
  return items.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      onClick={onClose}
    >
      <item.icon />
      {item.label}
    </NavLink>
  ))
}

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    api.getSettings().then(data => {
      if (data?.logoUrl) setLogo(data.logoUrl)
    }).catch(() => {})
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('khotwa_token')
    navigate('/admin/login')
  }

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          {logo && (
            <div className="sidebar-logo-icon" style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
              <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <div className="sidebar-brand-text">
            <h2>بالعلم نرتقي</h2>
            <span>لوحة التحكم</span>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavItems items={mainNav} onClose={onClose} />
        <div className="nav-section-label">الإدارة</div>
        <NavItems items={managementNav} onClose={onClose} />
        <div className="nav-section-label">التنظيم</div>
        <NavItems items={scheduleNav} onClose={onClose} />
        <div className="nav-section-label">النظام</div>
        <NavItems items={[{ to: '/admin/settings', icon: Settings, label: 'الإعدادات' }]} onClose={onClose} />
      </nav>
      <div className="sidebar-footer">
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={16} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  )
}

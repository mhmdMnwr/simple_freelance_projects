import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, GraduationCap, BookOpen, School, Layers, CalendarClock, Megaphone, LogOut } from 'lucide-react'

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

  const handleLogout = () => {
    localStorage.removeItem('khotwa_token')
    navigate('/admin/login')
  }

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon" style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="sidebar-brand-text">
            <h2>مؤسسة خطوة</h2>
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

import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('khotwa_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

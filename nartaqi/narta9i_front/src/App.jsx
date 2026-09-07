import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StudentsPage from './pages/StudentsPage'
import TeachersPage from './pages/TeachersPage'
import SubjectsPage from './pages/SubjectsPage'
import ClassesPage from './pages/ClassesPage'
import LevelsPage from './pages/LevelsPage'
import SessionsPage from './pages/SessionsPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import SettingsPage from './pages/SettingsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import LandingPage from './landing/LandingPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="levels" element={<LevelsPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getToken() {
  return localStorage.getItem('khotwa_token');
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem('khotwa_token');
    window.location.href = '/admin/login';
    throw new Error('غير مصرح');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'حدث خطأ');
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
  del: (path) => request('DELETE', path),

  // Auth
  login: (username, password) => request('POST', '/auth/login', { username, password }),
  changePassword: (oldPassword, newPassword) => request('PATCH', '/auth/change-password', { oldPassword, newPassword }),

  // Levels
  getLevels: () => request('GET', '/admin/levels'),
  createLevel: (data) => request('POST', '/admin/levels', data),
  updateLevel: (id, data) => request('PATCH', `/admin/levels/${id}`, data),
  deleteLevel: (id) => request('DELETE', `/admin/levels/${id}`),

  // Classes
  getClasses: () => request('GET', '/admin/classes'),
  createClass: (data) => request('POST', '/admin/classes', data),
  updateClass: (id, data) => request('PATCH', `/admin/classes/${id}`, data),
  deleteClass: (id) => request('DELETE', `/admin/classes/${id}`),

  // Subjects
  getSubjects: () => request('GET', '/admin/subjects'),
  createSubject: (data) => request('POST', '/admin/subjects', data),
  updateSubject: (id, data) => request('PATCH', `/admin/subjects/${id}`, data),
  deleteSubject: (id) => request('DELETE', `/admin/subjects/${id}`),

  // Teachers
  getTeachers: () => request('GET', '/admin/teachers'),
  createTeacher: (data) => request('POST', '/admin/teachers', data),
  updateTeacher: (id, data) => request('PATCH', `/admin/teachers/${id}`, data),
  deleteTeacher: (id) => request('DELETE', `/admin/teachers/${id}`),

  // Students
  getStudents: () => request('GET', '/admin/students'),
  createStudent: (data) => request('POST', '/admin/students', data),
  updateStudent: (id, data) => request('PATCH', `/admin/students/${id}`, data),
  deleteStudent: (id) => request('DELETE', `/admin/students/${id}`),

  // Sessions
  getSessions: () => request('GET', '/admin/sessions'),
  createSession: (data) => request('POST', '/admin/sessions', data),
  updateSession: (id, data) => request('PATCH', `/admin/sessions/${id}`, data),
  deleteSession: (id) => request('DELETE', `/admin/sessions/${id}`),

  // Announcements
  getAnnouncements: () => request('GET', '/admin/announcements'),
  createAnnouncement: (data) => request('POST', '/admin/announcements', data),
  updateAnnouncement: (id, data) => request('PATCH', `/admin/announcements/${id}`, data),
  deleteAnnouncement: (id) => request('DELETE', `/admin/announcements/${id}`),

  // Testimonials
  getTestimonials: () => request('GET', '/admin/testimonials'),
  createTestimonial: (data) => request('POST', '/admin/testimonials', data),
  deleteTestimonial: (id) => request('DELETE', `/admin/testimonials/${id}`),

  // Settings
  getSettings: () => request('GET', '/admin/settings'),
  updateLogo: (logoUrl) => request('PATCH', '/admin/settings/logo', { logoUrl }),
};

const API = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/public`;

async function request(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'حدث خطأ');
  }
  return res.json();
}

export const publicApi = {
  getAnnouncements: () => request('GET', '/announcements'),
  getTimetable: () => request('GET', '/timetable'),
  getLevels: () => request('GET', '/levels'),
  getTeachers: () => request('GET', '/teachers'),
  registerStudent: (data) => request('POST', '/register', data),
};

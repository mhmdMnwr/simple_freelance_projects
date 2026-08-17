"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { LEVELS, SUBJECTS } from "../data/subjects";
import RegisterModal from "../components/RegisterModal";
import { verifyLogin, logoutAction, fetchRegistrations, deleteRegistration, isAuthenticated } from "./actions";

const PER_PAGE = 10;

/* ─────────────────────────── Login ─────────────────────────── */
function LoginForm({ onSuccess }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user || !pass) {
      setError("Please fill in both fields.");
      return;
    }
    const result = await verifyLogin(user, pass);
    if (result.success) {
      onSuccess();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-wrap">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 className="admin-login-title">تسجيل الدخول</h1>
        <p className="admin-login-subtitle">لوحة تحكم مدرسة speakLab</p>

        <div className="admin-login-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <input
            className="admin-login-input"
            type="text"
            placeholder="اسم المستخدم"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="username"
            dir="ltr"
          />
        </div>

        <div className="admin-login-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <input
            className="admin-login-input"
            type="password"
            placeholder="كلمة المرور"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
            dir="ltr"
          />
        </div>

        <button type="submit" className="admin-login-btn">دخول</button>

        {error && <div className="admin-login-error">اسم المستخدم أو كلمة المرور غير صحيحة</div>}
      </form>
    </div>
  );
}

/* ─────────────────────────── Dashboard ─────────────────────────── */
function Dashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", fname: "", email: "", phone: "", level: "", subject: "" });
  const [addStatus, setAddStatus] = useState("idle"); // idle | loading | error
  const [addError, setAddError] = useState("");

  /* fetch data */
  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await fetchRegistrations();
    if (result.success && result.data) {
      setRegistrations(result.data);
    } else {
      console.error(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* available subjects based on level filter */
  const availableSubjects = useMemo(() => {
    if (!levelFilter) {
      return [...new Set(registrations.map(r => r.subject))].sort();
    }
    return SUBJECTS[levelFilter] || [];
  }, [levelFilter, registrations]);

  /* filtered + paginated data */
  const filtered = useMemo(() => {
    let result = registrations;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.fname?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.phone?.toLowerCase().includes(q)
      );
    }
    if (levelFilter) {
      result = result.filter((r) => r.level === levelFilter);
    }
    if (subjectFilter) {
      result = result.filter((r) => r.subject === subjectFilter);
    }
    return result;
  }, [registrations, search, levelFilter, subjectFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* reset page when filters change */
  useEffect(() => { setPage(1); }, [search, levelFilter, subjectFilter]);

  /* reset subject filter when level changes */
  useEffect(() => { setSubjectFilter(""); }, [levelFilter]);

  /* stats */
  const totalCount = registrations.length;
  const cemCount = registrations.filter((r) => r.level === "متوسط").length;
  const lyceeCount = registrations.filter((r) => r.level === "ثانوي").length;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return `${date} ${time}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التسجيل؟")) return;
    setLoading(true);
    const result = await deleteRegistration(id);
    if (!result.success) {
      alert("حدث خطأ أثناء الحذف: " + result.error);
      setLoading(false);
    } else {
      fetchData();
    }
  };

  return (
    <div className="admin-shell">
      {/* Top bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <Image src="/logo.jpg" alt="speakLab" width={34} height={34} />
          <span>إدارة speakLab</span>
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-topbar-btn admin-topbar-btn--add" onClick={() => setShowAddModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            إضافة طالب
          </button>
          <button className="admin-topbar-btn" onClick={fetchData}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            تحديث
          </button>
          <button
            className="admin-topbar-btn admin-topbar-btn--danger"
            onClick={async () => { 
              await logoutAction(); 
              onLogout(); 
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            خروج
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon--total">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div className="admin-stat-number">{totalCount}</div>
              <div className="admin-stat-label">إجمالي التسجيلات</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon--cem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            </div>
            <div>
              <div className="admin-stat-number">{cemCount}</div>
              <div className="admin-stat-label">الطور المتوسط</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon--lycee">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5"/></svg>
            </div>
            <div>
              <div className="admin-stat-number">{lyceeCount}</div>
              <div className="admin-stat-label">الطور الثانوي</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className="admin-search-input"
              type="text"
              placeholder="ابحث بالاسم، الإيميل، أو رقم الهاتف..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-filter-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">جميع الأطوار</option>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
          <select
            className="admin-filter-select"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">جميع المواد</option>
            {availableSubjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
            <span>جاري تحميل التسجيلات...</span>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>الاسم</th>
                  <th>اللقب</th>
                  <th>البريد الإلكتروني</th>
                  <th>الهاتف</th>
                  <th>الطور</th>
                  <th>المادة</th>
                  <th>التاريخ</th>
                  <th style={{ textAlign: "center" }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan="9">
                      <div className="admin-table-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <p>لا يوجد تسجيلات.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((r, i) => (
                    <tr key={r.id || i}>
                      <td style={{ color: "var(--admin-text-muted)" }}>
                        {(page - 1) * PER_PAGE + i + 1}
                      </td>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td>{r.fname}</td>
                      <td>{r.email}</td>
                      <td dir="ltr">{r.phone || "—"}</td>
                      <td>
                        <span className={`admin-level-badge ${r.level === "متوسط" ? "admin-level-badge--cem" : "admin-level-badge--lycee"}`}>
                          {r.level}
                        </span>
                      </td>
                      <td>{r.subject}</td>
                      <td style={{ color: "var(--admin-text-muted)", whiteSpace: "nowrap", direction: "ltr" }}>
                        {formatDate(r.created_at)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button 
                          onClick={() => handleDelete(r.id)}
                          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "4px" }}
                          title="حذف"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {filtered.length > PER_PAGE && (
              <div className="admin-pagination">
                <span className="admin-pagination-info">
                  عرض {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} من {filtered.length}
                </span>
                <div className="admin-pagination-btns">
                  <button
                    className="admin-page-btn"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    → السابق
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .map((p, idx, arr) => (
                      <span key={p}>
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span style={{ color: "var(--admin-text-muted)", padding: "0 4px" }}>…</span>
                        )}
                        <button
                          className={`admin-page-btn ${p === page ? "admin-page-btn--active" : ""}`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      </span>
                    ))}
                  <button
                    className="admin-page-btn"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    التالي ←
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Student Modal using the shared RegisterModal */}
      <RegisterModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSuccess={() => { setShowAddModal(false); fetchData(); }} 
      />
    </div>
  );
}

/* ─────────────────────────── Main Page ─────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    isAuthenticated().then(auth => {
      setAuthed(auth);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
        </div>
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onSuccess={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}

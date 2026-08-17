"use client";

import { useState, useEffect } from "react";
import { LEVELS, SUBJECTS } from "../data/subjects";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    fname: "",
    email: "",
    phone: "",
    level: "",
    subject: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", fname: "", email: "", phone: "", level: "", subject: "" });
      setStatus("idle");
      setErrorMsg("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "level") return { ...prev, level: value, subject: "" };
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!form.name || !form.fname || !form.email || !form.phone || !form.level || !form.subject) {
      setStatus("error");
      setErrorMsg("يرجى ملء جميع الحقول");
      return;
    }

    if (!isSupabaseConfigured()) {
      setStatus("error");
      setErrorMsg("خدمة التسجيل غير متاحة حاليًا. يرجى إعداد Supabase أولاً.");
      return;
    }

    try {
      const { error } = await supabase.from("registrations").insert([{
        name: form.name,
        fname: form.fname,
        email: form.email,
        phone: form.phone,
        level: form.level,
        subject: form.subject,
        created_at: new Date().toISOString(),
      }]);
      if (error) throw error;
      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "حدث خطأ. حاول مرة أخرى.");
    }
  };

  if (!isOpen) return null;

  const subjects = form.level ? SUBJECTS[form.level] : [];

  return (
    <div className="reg-overlay" onClick={onClose}>
      <div className="reg-modal" onClick={(e) => e.stopPropagation()}>
        {/* Decorative gradient header bar */}
        <div className="reg-accent-bar"></div>

        {/* Close button */}
        <button className="reg-close" onClick={onClose} aria-label="إغلاق">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="reg-success">
            <div className="reg-success-ring">
              <svg className="reg-checkmark" viewBox="0 0 52 52">
                <circle className="reg-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="reg-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="reg-success-title">تم التسجيل بنجاح!</h3>
            <p className="reg-success-text">
              شكرًا لتسجيلك في مدرسة <strong>speakLab</strong>.<br />
              سنتواصل معك قريبًا إن شاء الله.
            </p>
            <button className="reg-btn" onClick={onClose}>حسنًا</button>
          </div>
        ) : (
          <>
            <div className="reg-header">
              <h2 className="reg-title">التسجيل في مدرسة speakLab</h2>
              <p className="reg-subtitle">
                أكمل البيانات أدناه وسنتواصل معك لتأكيد التسجيل
              </p>
            </div>

            <form className="reg-form" onSubmit={handleSubmit}>
              {/* Name row — side by side */}
              <div className="reg-row">
                <div className="reg-field" style={{ animationDelay: "0.05s" }}>
                  <label className="reg-label" htmlFor="reg-name">
                    <svg className="reg-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    الاسم
                  </label>
                  <input
                    id="reg-name"
                    className="reg-input"
                    type="text"
                    name="name"
                    placeholder="الاسم الأول"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </div>
                <div className="reg-field" style={{ animationDelay: "0.1s" }}>
                  <label className="reg-label" htmlFor="reg-fname">
                    <svg className="reg-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    اللقب
                  </label>
                  <input
                    id="reg-fname"
                    className="reg-input"
                    type="text"
                    name="fname"
                    placeholder="اسم العائلة"
                    value={form.fname}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="reg-field" style={{ animationDelay: "0.15s" }}>
                <label className="reg-label" htmlFor="reg-email">
                  <svg className="reg-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  البريد الإلكتروني
                </label>
                <input
                  id="reg-email"
                  className="reg-input"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  dir="ltr"
                  style={{ textAlign: "left" }}
                />
              </div>

              {/* Phone */}
              <div className="reg-field" style={{ animationDelay: "0.18s" }}>
                <label className="reg-label" htmlFor="reg-phone">
                  <svg className="reg-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  رقم الهاتف
                </label>
                <input
                  id="reg-phone"
                  className="reg-input"
                  type="tel"
                  name="phone"
                  placeholder="05xx xx xx xx"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  dir="ltr"
                  style={{ textAlign: "left" }}
                />
              </div>

              {/* Level — Pill Toggle */}
              <div className="reg-field" style={{ animationDelay: "0.2s" }}>
                <label className="reg-label">
                  <svg className="reg-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5"/></svg>
                  المستوى الدراسي
                </label>
                <div className="reg-pills">
                  {LEVELS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      className={`reg-pill ${form.level === l.id ? "active" : ""}`}
                      onClick={() => handleChange({ target: { name: "level", value: l.id } })}
                    >
                      <span className="reg-pill-dot"></span>
                      {l.id === "متوسط" ? "🏫" : "🎓"} {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className={`reg-field ${!form.level ? "reg-field--disabled" : ""}`} style={{ animationDelay: "0.25s" }}>
                <label className="reg-label" htmlFor="reg-subject">
                  <svg className="reg-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  المادة
                </label>
                <div className="reg-select-wrap">
                  <select
                    id="reg-subject"
                    className="reg-input reg-select"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={!form.level}
                  >
                    <option value="" disabled>
                      {form.level ? "اختر المادة" : "اختر المستوى أولاً"}
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <svg className="reg-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="reg-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="reg-btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="reg-spinner"></span>
                ) : (
                  <>
                    <span>تأكيد التسجيل</span>
                    <svg className="reg-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

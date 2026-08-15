"use client";

import { useState, useEffect } from "react";

export default function RegistrationModal({ isOpen, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "ذكر",
    level: "ابتدائي",
    subjects: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form on close after a delay to allow animation to finish
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          firstName: "", lastName: "", email: "", phone: "", age: "", gender: "ذكر", level: "ابتدائي", subjects: []
        });
        setErrors({});
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const subjectsByLevel = {
    "ابتدائي": ["الرياضيات", "العربية", "الفرنسية", "الإنجليزية", "التربية الإسلامية", "التربية العلمية", "التربية المدنية", "التاريخ والجغرافيا"],
    "متوسط": ["الرياضيات", "الفيزياء", "العلوم الطبيعية", "العربية", "الفرنسية", "الإنجليزية", "التاريخ والجغرافيا", "مواد أخرى"],
    "علوم تجريبية": ["الرياضيات", "الفيزياء", "العلوم الطبيعية", "العربية", "الفرنسية", "الإنجليزية", "التاريخ والجغرافيا", "الفلسفة"],
    "تقني رياضي": ["الرياضيات", "الفيزياء", "الهندسة", "العربية", "الفرنسية", "الإنجليزية", "الفلسفة"],
    "إقتصاد وتسيير": ["الرياضيات", "المحاسبة", "الاقتصاد", "القانون", "العربية", "الفرنسية", "الإنجليزية", "التاريخ والجغرافيا", "الفلسفة"],
    "آداب و فلسفة": ["الأدب العربي", "الفلسفة", "التاريخ والجغرافيا", "الفرنسية", "الإنجليزية", "الرياضيات", "العلوم الإسلامية"],
    "لغات": ["الأدب العربي", "الفرنسية", "الإنجليزية", "الإسبانية", "الألمانية", "الفلسفة", "التاريخ والجغرافيا"],
    "أخرى": ["القرآن", "سوروبان"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset subjects if level changes
      ...(name === "level" ? { subjects: [] } : {})
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubjectToggle = (subject) => {
    setFormData((prev) => {
      const newSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      
      if (newSubjects.length > 0 && errors.subjects) {
        setErrors((errs) => ({ ...errs, subjects: "" }));
      }
      return { ...prev, subjects: newSubjects };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "هذا الحقل مطلوب";
    if (!formData.lastName.trim()) newErrors.lastName = "هذا الحقل مطلوب";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }
    if (!formData.phone.trim() || !/^(05|06|07)\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "يرجى إدخال رقم هاتف جزائري صحيح.";
    }
    if (!formData.age.trim() || isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = "يرجى إدخال عمر صحيح.";
    }
    if (!formData.gender) newErrors.gender = "هذا الحقل مطلوب";
    if (!formData.level) newErrors.level = "هذا الحقل مطلوب";
    if (formData.subjects.length === 0) newErrors.subjects = "يرجى اختيار مادة واحدة على الأقل.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="إغلاق">✕</button>

        {isSuccess ? (
          <div className="modal-success">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="success-title">تم تسجيل طلبك بنجاح</h3>
            <p className="success-desc">شكراً لك. سنتواصل معك قريباً لتأكيد التسجيل.</p>
            <button className="btn-modal-primary" onClick={onClose}>إغلاق</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="modal-label">التسجيل</span>
              <h2 className="modal-title">سجل معنا الآن</h2>
              <p className="modal-subtext">املأ المعلومات التالية وسنتواصل معك لتأكيد التسجيل.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h4 className="fs-title">المعلومات الشخصية</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>الاسم</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="أدخل اسمك" required />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>اللقب</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="أدخل لقبك" required />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" dir="ltr" className="ltr-input" required />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                    <div className="email-warning">
                      <span className="ew-icon">⚠️</span>
                      <span className="ew-text">يرجى التأكد من صحة البريد، سنستخدمه للتواصل معك.</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="05 XX XX XX XX" dir="ltr" className="ltr-input" required />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>العمر</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="أدخل عمرك" required />
                    {errors.age && <span className="error-message">{errors.age}</span>}
                  </div>
                  <div className="form-group">
                    <label>الجنس</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="fs-title">المعلومات الدراسية</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>الشعبة</label>
                    <select name="level" value={formData.level} onChange={handleInputChange} required>
                      <option value="ابتدائي">ابتدائي</option>
                      <option value="متوسط">متوسط</option>
                      <option value="علوم تجريبية">علوم تجريبية</option>
                      <option value="تقني رياضي">تقني رياضي</option>
                      <option value="إقتصاد وتسيير">إقتصاد وتسيير</option>
                      <option value="آداب و فلسفة">آداب و فلسفة</option>
                      <option value="لغات">لغات</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                    {errors.level && <span className="error-message">{errors.level}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>المواد (يمكنك اختيار أكثر من مادة)</label>
                    <div className="checkbox-grid">
                      {formData.level && subjectsByLevel[formData.level]?.map((sub, i) => (
                        <label key={i} className={`checkbox-label ${formData.subjects.includes(sub) ? 'selected' : ''}`}>
                          <input 
                            type="checkbox" 
                            checked={formData.subjects.includes(sub)}
                            onChange={() => handleSubjectToggle(sub)}
                          />
                          <span className="checkbox-text">{sub}</span>
                        </label>
                      ))}
                    </div>
                    {errors.subjects && <span className="error-message">{errors.subjects}</span>}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn-modal-primary">سجل</button>
                <p className="privacy-note">بتسجيلك، سيتم استخدام المعلومات للتواصل معك بخصوص التسجيل.</p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

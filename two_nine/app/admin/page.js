"use client";

import { useState } from "react";
import "./admin.css";

// Mock Data
const MOCK_STUDENTS = [
  { id: "1001", firstName: "أحمد", lastName: "بن علي", email: "ahmed@example.com", phone: "05 45 12 34 56", age: 16, gender: "ذكر", level: "ثانوي", subjects: ["الرياضيات", "الفيزياء"], date: "2023-10-01" },
  { id: "1002", firstName: "سارة", lastName: "منصور", email: "sara@example.com", phone: "06 77 88 99 00", age: 14, gender: "أنثى", level: "متوسط", subjects: ["الفيزياء", "العلوم الطبيعية", "اللغة العربية"], date: "2023-10-02" },
  { id: "1003", firstName: "ياسين", lastName: "براهيمي", email: "yacine@example.com", phone: "07 11 22 33 44", age: 10, gender: "ذكر", level: "ابتدائي", subjects: ["اللغة العربية", "التربية الإسلامية"], date: "2023-10-03" },
  { id: "1004", firstName: "فاطمة", lastName: "زهرة", email: "fatima@example.com", phone: "05 99 88 77 66", age: 17, gender: "أنثى", level: "علوم تجريبية", subjects: ["العلوم الطبيعية", "الرياضيات", "الفرنسية"], date: "2023-10-03" },
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("الكل");
  const [genderFilter, setGenderFilter] = useState("الكل");
  const [subjectFilter, setSubjectFilter] = useState("الكل");

  const filteredStudents = MOCK_STUDENTS.filter(student => {
    // Search match (name, email, phone)
    const matchesSearch = 
      searchTerm === "" || 
      `${student.firstName} ${student.lastName}`.includes(searchTerm) ||
      student.email.includes(searchTerm) ||
      student.phone.replace(/\s/g, '').includes(searchTerm.replace(/\s/g, ''));

    // Level filter
    const matchesLevel = levelFilter === "الكل" || student.level === levelFilter;

    // Gender filter
    const matchesGender = genderFilter === "الكل" || student.gender === genderFilter;

    // Subject filter
    const matchesSubject = subjectFilter === "الكل" || student.subjects.includes(subjectFilter);

    return matchesSearch && matchesLevel && matchesGender && matchesSubject;
  });

  return (
    <main className="admin-simple-container">
      <div className="admin-header-simple">
        <h1>الطلاب المسجلون</h1>
        <p>عرض قائمة الطلاب المسجلين والمواد التي اختاروها.</p>
      </div>

      <div className="admin-controls">
        <input 
          type="text" 
          placeholder="ابحث بالاسم، البريد أو الهاتف..." 
          className="admin-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="admin-filter-select"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="الكل">جميع الشعب</option>
          <option value="ابتدائي">ابتدائي</option>
          <option value="متوسط">متوسط</option>
          <option value="ثانوي">ثانوي</option>
          <option value="علوم تجريبية">علوم تجريبية</option>
        </select>
        <select 
          className="admin-filter-select"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="الكل">الجنسين</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
        </select>
        <select 
          className="admin-filter-select"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="الكل">جميع المواد</option>
          <option value="الرياضيات">الرياضيات</option>
          <option value="الفيزياء">الفيزياء</option>
          <option value="العلوم الطبيعية">العلوم الطبيعية</option>
          <option value="اللغة العربية">اللغة العربية</option>
          <option value="الفرنسية">الفرنسية</option>
          <option value="التربية الإسلامية">التربية الإسلامية</option>
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="admin-empty">لم يتم العثور على أي طالب يطابق بحثك.</div>
      ) : (
        <div className="students-grid">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="sc-header">
                <h3>{student.firstName} {student.lastName}</h3>
                <span className="sc-level">{student.level}</span>
              </div>
              
              <div className="sc-details">
                <div className="sc-row">
                  <span className="sc-label">الهاتف:</span>
                  <span className="sc-val" style={{ direction: "ltr" }}>{student.phone}</span>
                </div>
                <div className="sc-row">
                  <span className="sc-label">الإيميل:</span>
                  <span className="sc-val">{student.email}</span>
                </div>
                <div className="sc-row">
                  <span className="sc-label">العمر:</span>
                  <span className="sc-val">{student.age} سنة ({student.gender})</span>
                </div>
              </div>

              <div className="sc-subjects">
                <span className="sc-label">المواد المسجلة:</span>
                <div className="sc-tags">
                  {student.subjects.map(sub => (
                    <span key={sub} className="sc-tag">{sub}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

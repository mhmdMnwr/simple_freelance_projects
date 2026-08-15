export default function Subjects() {
  const subjects = [
    { name: "الرياضيات", levels: "متوسط — ثانوي", icon: "📐" },
    { name: "الفيزياء", levels: "متوسط — ثانوي", icon: "⚛️" },
    { name: "العلوم", levels: "متوسط — ثانوي", icon: "🔬" },
    { name: "الهندسة", levels: "ثانوي", icon: "🏗️" },
    { name: "الأدب العربي", levels: "ثانوي", icon: "📚" },
    { name: "الفلسفة", levels: "ثانوي", icon: "🧠" },
    { name: "اللغات", levels: "فرنسية — إنجليزية — ألمانية", icon: "🌍" },
    { name: "التاريخ والجغرافيا", levels: "ثانوي", icon: "🗺️" },
    { name: "المحاسبة", levels: "ثانوي", icon: "📊" },
    { name: "تحفيظ القرآن", levels: "", icon: "📖" },
    { name: "تعليم السوروبان", levels: "", icon: "🧮" },
  ];

  return (
    <section className="subjects-section" id="subjects">
      {/* Subtle Educational Background Pattern */}
      <div className="subjects-bg-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(15, 23, 42, 0.03)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      <div className="container">
        <div className="subjects-header">
          <span className="section-label">المواد الدراسية</span>
          <h2 className="section-heading">المواد التي ندرّسها</h2>
          <p className="subjects-subtext">
            نغطي المواد الأساسية لجميع المستويات الدراسية، من المتوسط إلى الثانوي.
          </p>
        </div>

        <div className="subjects-grid">
          {subjects.map((s, i) => (
            <div className="subject-card" key={i}>
              <div className="sc-accent-line"></div>
              <div className="sc-content">
                <div className="sc-top">
                  <span className="sc-icon">{s.icon}</span>
                </div>
                <div className="sc-bottom">
                  <h4 className="sc-title">{s.name}</h4>
                  {s.levels && <span className="sc-level">{s.levels}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

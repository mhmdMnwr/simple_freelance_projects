import { useState, useEffect } from 'react'
import { publicApi } from '../publicApi'

export default function About() {
  const [aboutImg, setAboutImg] = useState('/images/school.png')
  useEffect(() => {
    publicApi.getSettings().then(data => {
      if (data?.aboutImgUrl) setAboutImg(data.aboutImgUrl)
    }).catch(() => {})
  }, [])
  const programs = [
    { icon: '📚', num: '01', title: 'دروس الدعم', desc: 'دروس دعم مدرسي في جميع المواد وجميع المستويات لضمان التفوق الدراسي.' },
    { icon: '🧒', num: '02', title: 'برامج الأطفال', desc: 'برامج متخصصة لتنمية الذكاء والتعلم المبكر عند الأطفال.' },
    { icon: '🌍', num: '03', title: 'اللغات الأجنبية', desc: 'تعليم اللغات الأجنبية للصغار والكبار بأساليب حديثة وفعالة.' },
    { icon: '📖', num: '04', title: 'القرآن الكريم', desc: 'حلقات تحفيظ وتجويد القرآن الكريم بإشراف معلمين متخصصين.' },
  ]

  return (
    <>
      <section className="l-about" id="about">
        <div className="l-container">
          <div className="l-about-grid fade-up">
            <div className="l-about-img-wrap">
              <img src={aboutImg} alt="مؤسسة خطوة التعليمية" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="l-about-float">
                <span className="l-about-float-num">+05</span>
                <span className="l-about-float-txt">سنوات من الوجود</span>
              </div>
            </div>
            <div>
              <span className="l-section-label">من نحن</span>
              <h2 className="l-section-heading">مؤسسة <span className="gold">خطوة</span> التعليمية</h2>
              <div className="l-about-text">
                <p>مؤسسة تعليمية متخصصة في <span className="highlight">الدعم المدرسي • برامج الأطفال • اللغات الأجنبية</span> بطاقم إداري بخبرة 10 سنوات وأساتذة أكفاء على المستوى الوطني.</p>
                <p><strong>رؤيتنا:</strong> نسعى إلى تكوين تربوي وتعليم على أقصى المستويات بفضل أساتذتنا الأكفاء.</p>
                <p><strong>رسالتنا:</strong> التربية والأخلاق والثبات على القيم.</p>
              </div>
              <div className="l-about-stats">
                <div className="l-stat-item"><span className="l-stat-num">05+</span><span className="l-stat-txt">سنوات خبرة</span></div>
                <div className="l-stat-item"><span className="l-stat-num">10+</span><span className="l-stat-txt">سنوات خبرة إدارية</span></div>
                <div className="l-stat-item"><span className="l-stat-num">4+</span><span className="l-stat-txt">مراحل تعليمية</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Stages */}
      <section className="l-stages" style={{ padding: '60px 0', background: 'var(--off-white)' }}>
        <div className="l-container">
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="l-section-label">المراحل التعليمية</span>
            <h2 className="l-section-heading">نغطي جميع المراحل الدراسية</h2>
          </div>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>
            {['التحضيري', 'الابتدائي', 'المتوسط', 'الثانوي'].map((stage, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '28px 20px', background: 'var(--white)',
                borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)', transition: 'all 0.25s ease',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{['🎒', '📝', '📐', '🎓'][i]}</div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-dark)' }}>{stage}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="l-whyus">
        <div className="l-container">
          <div className="l-whyus-header fade-up">
            <span className="l-section-label">برامجنا</span>
            <h2 className="l-section-heading">ما نقدمه لأبنائكم</h2>
            <p className="l-whyus-sub">برامج تعليمية شاملة تغطي جميع الاحتياجات الدراسية والتربوية لكل الأعمار.</p>
          </div>
          <div className="l-features-grid fade-up">
            {programs.map(f => (
              <div className="l-feature-card" key={f.num}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="l-fc-icon">{f.icon}</span>
                  <span className="l-fc-num">{f.num}</span>
                </div>
                <h4 className="l-fc-title">{f.title}</h4>
                <p className="l-fc-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

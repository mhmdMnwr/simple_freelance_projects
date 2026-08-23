export default function About() {
  const features = [
    { icon: '👨‍🏫', num: '01', title: 'أساتذة متميزون', desc: 'نخبة من الأساتذة ذوي الخبرة والكفاءة العالية في التدريس.' },
    { icon: '📈', num: '02', title: 'متابعة مستمرة', desc: 'متابعة فردية لكل تلميذ وتقارير دورية لأولياء الأمور.' },
    { icon: '👥', num: '03', title: 'مجموعات منظمة', desc: 'أفواج صغيرة لضمان التفاعل والفهم الأفضل.' },
    { icon: '📝', num: '04', title: 'برامج مراجعة', desc: 'اختبارات دورية وبرامج مراجعة مكثفة لقياس المستوى.' },
    { icon: '✨', num: '05', title: 'بيئة محفزة', desc: 'بيئة تعليمية مريحة ومحفزة تساعدك على التركيز والنجاح.' },
  ]

  return (
    <>
      <section className="l-about" id="about">
        <div className="l-container">
          <div className="l-about-grid fade-up">
            <div className="l-about-img-wrap">
              <img src="/images/school.png" alt="أكاديمية خطوة" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="l-about-float">
                <span className="l-about-float-num">+500</span>
                <span className="l-about-float-txt">تلميذ مسجل</span>
              </div>
            </div>
            <div>
              <span className="l-section-label">عن الأكاديمية</span>
              <h2 className="l-section-heading">أكاديمية <span className="gold">خطوة</span></h2>
              <div className="l-about-text">
                <p>نقدم دروس دعم مدرسي لجميع المستويات في المواد الأساسية: <span className="highlight">رياضيات • فيزياء • علوم • لغات</span></p>
                <p>نعتمد على أساليب شرح مبسطة تضمن فهماً عميقاً للمادة، مع متابعة دائمة لكل طالب وتقارير دورية لأولياء الأمور.</p>
              </div>
              <div className="l-about-stats">
                <div className="l-stat-item"><span className="l-stat-num">500+</span><span className="l-stat-txt">تلميذ</span></div>
                <div className="l-stat-item"><span className="l-stat-num">95%+</span><span className="l-stat-txt">نسبة النجاح</span></div>
                <div className="l-stat-item"><span className="l-stat-num">3+</span><span className="l-stat-txt">سنوات خبرة</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="l-whyus">
        <div className="l-container">
          <div className="l-whyus-header fade-up">
            <span className="l-section-label">لماذا تختارنا</span>
            <h2 className="l-section-heading">كل ما تحتاجه لتتقدم بثقة</h2>
            <p className="l-whyus-sub">نجمع بين الأساتذة المتميزين والمتابعة الفردية في بيئة محفزة تضمن لك تحقيق أفضل النتائج.</p>
          </div>
          <div className="l-features-grid fade-up">
            {features.map(f => (
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

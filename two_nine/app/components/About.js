import Image from "next/image";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        
        {/* =========================================
            PART 1: ABOUT THE SCHOOL
        ========================================= */}
        <div className="about-editorial">
          {/* Left Column: Visual */}
          <div className="about-visual">
            <div className="about-image-wrapper">
              <Image 
                src="/about-classroom.png" 
                alt="مدرسة TWO NINE" 
                fill 
                className="about-image"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="about-image-overlay"></div>
            </div>
            
            {/* Floating Stat Badge */}
            <div className="about-floating-badge">
              <span className="afb-icon">👨‍🎓</span>
              <div className="afb-content">
                <span className="afb-number">+500</span>
                <span className="afb-text">تلميذ مسجل</span>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="about-content">
            <span className="section-label">عن المدرسة</span>
            <h2 className="section-heading">
              مدرسة <span className="text-gold">TWO NINE</span>
            </h2>
            
            <div className="about-text">
              <p>
                نقدم دروس دعم مدرسي لجميع المستويات – <span className="highlight-pill">من الابتدائي إلى الثانوي</span> – في المواد الأساسية:
              </p>
              <p className="highlight-list">
                رياضيات • فيزياء • علوم • لغات
              </p>
              <p>
                نوفر أيضاً تكوينات في عدة لغات أجنبية لتعزيز مهارات الطلبة.
              </p>
              <p>
                نعتمد على أساليب شرح مبسطة تضمن فهماً عميقاً للمادة، مع <span className="highlight-text">متابعة دائمة لكل طالب</span> وتقارير دورية لأولياء الأمور.
              </p>
            </div>

            {/* Editorial Stats Row */}
            <div className="about-stats-row">
              <div className="stat-editorial">
                <span className="se-number">500+</span>
                <span className="se-text">تلميذ</span>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-editorial">
                <span className="se-number">95%+</span>
                <span className="se-text">نسبة النجاح</span>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-editorial">
                <span className="se-number">3+</span>
                <span className="se-text">سنوات خبرة</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            PART 2: WHY CHOOSE US
        ========================================= */}
        <div className="why-us-section">
          <div className="why-us-header">
            <span className="section-label">لماذا تختارنا</span>
            <h2 className="section-heading">كل ما تحتاجه لتتقدم بثقة</h2>
            <p className="section-subtext">
              في TWO NINE، نجمع بين الأساتذة المتميزين والمتابعة الفردية في بيئة محفزة تضمن لك تحقيق أفضل النتائج الدراسية.
            </p>
          </div>

          <div className="why-us-grid">
            
            {/* Featured Card */}
            <div className="feature-card feature-featured">
              <div className="fc-header">
                <span className="fc-icon">👨‍🏫</span>
                <span className="fc-badge">01</span>
              </div>
              <h4 className="fc-title">أساتذة متميزون</h4>
              <p className="fc-desc">
                نخبة من الأساتذة ذوي الخبرة والكفاءة العالية، ملتزمون بتقديم أفضل أساليب التعليم والتبسيط لضمان استيعابك للمعلومة.
              </p>
            </div>

            {/* Standard Cards */}
            <div className="feature-card">
              <div className="fc-header">
                <span className="fc-icon">📈</span>
                <span className="fc-badge">02</span>
              </div>
              <h4 className="fc-title">متابعة مستمرة</h4>
              <p className="fc-desc">متابعة فردية لكل تلميذ وتقارير دورية لأولياء الأمور.</p>
            </div>

            <div className="feature-card">
              <div className="fc-header">
                <span className="fc-icon">👥</span>
                <span className="fc-badge">03</span>
              </div>
              <h4 className="fc-title">مجموعات منظمة</h4>
              <p className="fc-desc">أفواج صغيرة لضمان التفاعل والفهم الأفضل.</p>
            </div>

            <div className="feature-card">
              <div className="fc-header">
                <span className="fc-icon">📝</span>
                <span className="fc-badge">04</span>
              </div>
              <h4 className="fc-title">برامج مراجعة</h4>
              <p className="fc-desc">برامج مراجعة مكثفة واختبارات دورية لقياس المستوى.</p>
            </div>

            <div className="feature-card">
              <div className="fc-header">
                <span className="fc-icon">✨</span>
                <span className="fc-badge">05</span>
              </div>
              <h4 className="fc-title">بيئة محفزة</h4>
              <p className="fc-desc">بيئة تعليمية مريحة ومحفزة تساعدك على التركيز والنجاح.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

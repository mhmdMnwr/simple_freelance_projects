import Image from "next/image";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-text fade-up">
        <p className="section-label">من نحن</p>
        <h2 className="section-title">مرحباً بكم في<br />مدرسة فيكتوري</h2>
        <p className="section-text">
          نقدّم دروس دعم مدرسي لجميع المستويات — من الابتدائي إلى الثانوي —
          في المواد الأساسية: رياضيات، فيزياء، علوم، ولغات. إلى جانب ذلك،
          نوفّر تكوينات في عدة لغات أجنبية (فرنسية، إنجليزية) لتعزيز مهارات
          الطلاب. نعتمد على أساليب شرح مبسّطة تضمن فهماً عميقاً للمادة، مع
          متابعة دائمة لكل طالب وتقارير دورية لأولياء الأمور.
        </p>
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-icon">📚</div>
            <div className="about-stat-label">دروس دعم لكل المستويات</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon">🌍</div>
            <div className="about-stat-label">تكوين في عدة لغات</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon">📝</div>
            <div className="about-stat-label">تحضير للامتحانات</div>
          </div>
        </div>
      </div>
      <div className="about-image fade-up">
        <Image src="/about.jpg" alt="حصة دعم مدرسي" width={540} height={380} style={{ width: "100%", height: "auto" }} />
      </div>
    </section>
  );
}

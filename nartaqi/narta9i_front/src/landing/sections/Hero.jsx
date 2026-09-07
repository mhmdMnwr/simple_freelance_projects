import { useState, useEffect } from 'react'
import { publicApi } from '../publicApi'

export default function Hero() {
  const [bg, setBg] = useState(null)
  useEffect(() => {
    publicApi.getSettings().then(data => {
      if (data?.heroBgUrl) setBg(data.heroBgUrl)
    }).catch(() => {})
  }, [])
  return (
    <section className="l-hero" id="hero" style={{ backgroundImage: bg ? `linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.9) 100%), url(${bg})` : `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.95) 100%)` }}>
      <div className="l-hero-particle" style={{ width: 300, height: 300, top: '10%', right: '5%', background: 'rgba(99,102,241,0.08)' }} />
      <div className="l-hero-particle" style={{ width: 200, height: 200, bottom: '15%', left: '10%', background: 'rgba(244,63,94,0.08)', animationDelay: '3s' }} />
      <div className="l-hero-content">
        <div className="l-hero-badge">المنصة التعليمية بالعلم نرتقي أونلاين</div>
        <h1>بالعلم نرتقي... <span className="gold">نحو مستقبل أفضل</span></h1>
        <p className="l-hero-desc">
          منصة تعليمية أونلاين تهدف إلى تقديم تعليم نوعي ومتابعة مستمرة للتلاميذ في مختلف المراحل التعليمية، من خلال دروس فردية وجماعية يقدمها أساتذة مؤهلون، مع اعتماد وسائل تعليمية حديثة وتفاعلية.
        </p>
        <div className="l-hero-btns">
          <a href="#registration" className="l-btn-gold">
            سجل الآن
          </a>
          <a href="https://wa.me/213659395695" target="_blank" rel="noopener noreferrer" className="l-btn-outline">تواصل معنا</a>
        </div>
      </div>
    </section>
  )
}

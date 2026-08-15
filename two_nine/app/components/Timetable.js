"use client";

import { useState } from "react";
import { TIMETABLE } from "../data/timetable";

// Days from Saturday to Friday
const DAYS = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
// Hours from 07:00 to 19:00 (we need 12 blocks, so 7 to 18)
const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); 

export default function Timetable() {
  const [activeTab, setActiveTab] = useState(0);
  const activeData = TIMETABLE[activeTab];

  return (
    <section className="timetable-section" id="timetable">
      <div className="ts-header fade-up">
        <p className="section-label section-label--center">برنامج الدروس</p>
        <h2 className="section-title section-title--center">التوقيت الأسبوعي للأفواج</h2>
      </div>

      <div className="timetable-tabs fade-up">
        {TIMETABLE.map((item, index) => (
          <button 
            key={item.id} 
            className={`tt-tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {item.subject}
          </button>
        ))}
      </div>

      <div className="timetable-wrapper fade-up">
        <div className="tt-calendar">
          {/* Header Row */}
          <div className="tt-cell tt-header-corner" style={{ gridRow: 1, gridColumn: 1 }}></div>
          {HOURS.map((hour, i) => (
            <div key={hour} className="tt-header-time" style={{ gridRow: 1, gridColumn: i + 2 }}>
              {hour}:00
            </div>
          ))}

          {/* Days & Sessions Grid */}
          {DAYS.map((day, dIdx) => (
            <div key={day} style={{ display: "contents" }}>
              {/* Day Name Column */}
              <div className="tt-cell tt-day-name" style={{ gridRow: dIdx + 2, gridColumn: 1 }}>
                {day}
              </div>
              
              {/* Empty background slots for the grid lines */}
              {HOURS.map((hour, i) => (
                <div 
                  key={hour} 
                  className="tt-cell tt-empty-slot" 
                  style={{ gridRow: dIdx + 2, gridColumn: i + 2 }}
                ></div>
              ))}
              
              {/* Actual Sessions overlay */}
              {activeData.sessions
                .filter(s => s.day === day)
                .map((session, sIdx) => {
                  // Grid columns are 1-indexed. Col 1 is Day name. Col 2 is 07:00.
                  const colStart = session.start - 7 + 2; 
                  const span = session.end - session.start;
                  
                  return (
                    <div 
                      key={sIdx} 
                      className="tt-session"
                      style={{ 
                        gridColumn: `${colStart} / span ${span}`,
                        gridRow: dIdx + 2 
                      }}
                    >
                      <span className="tt-s-group">{session.group}</span>
                      <span className="tt-s-teacher">{session.teacher}</span>
                    </div>
                  );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stacked List View */}
      <div className="tt-mobile-list fade-up">
        {DAYS.map(day => {
          const daySessions = activeData.sessions.filter(s => s.day === day);
          if (daySessions.length === 0) return null;
          
          return (
            <div key={day} className="tt-m-day">
              <h3 className="tt-m-day-title">{day}</h3>
              <div className="tt-m-sessions">
                {daySessions.map((session, sIdx) => (
                  <div key={sIdx} className="tt-m-session">
                    <div className="tt-m-time">
                      <span>{session.start}:00</span> - <span>{session.end}:00</span>
                    </div>
                    <div className="tt-m-details">
                      <span className="tt-m-group">{session.group}</span>
                      <span className="tt-m-teacher">{session.teacher}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { TIMETABLE, TIME_SLOTS, DAYS } from "../data/timetable";

// Merge consecutive slots with the same teacher+class into spans (max 2 per session)
const MAX_SESSION_SPAN = 2;

function getMergedCells(schedule, day, slots) {
  const merged = [];
  let i = 0;
  while (i < slots.length) {
    const cell = schedule[day]?.[slots[i]];
    if (!cell) {
      merged.push({ span: 1, data: null });
      i++;
    } else {
      // Look ahead for consecutive same teacher+class, capped at MAX_SESSION_SPAN
      let span = 1;
      while (
        span < MAX_SESSION_SPAN &&
        i + span < slots.length &&
        schedule[day]?.[slots[i + span]]?.teacher === cell.teacher &&
        schedule[day]?.[slots[i + span]]?.class === cell.class
      ) {
        span++;
      }
      const startTime = slots[i].split(" - ")[0];
      const endTime = slots[i + span - 1].split(" - ")[1];
      merged.push({
        span,
        data: cell,
        timeLabel: `${endTime} - ${startTime}`,
      });
      i += span;
    }
  }
  return merged;
}

// Merge consecutive sessions for mobile view too (max 2 per session)
function getMergedSessions(schedule, day, slots) {
  const merged = [];
  let i = 0;
  while (i < slots.length) {
    const cell = schedule[day]?.[slots[i]];
    if (!cell) {
      i++;
      continue;
    }
    let span = 1;
    while (
      span < MAX_SESSION_SPAN &&
      i + span < slots.length &&
      schedule[day]?.[slots[i + span]]?.teacher === cell.teacher &&
      schedule[day]?.[slots[i + span]]?.class === cell.class
    ) {
      span++;
    }
    const startTime = slots[i].split(" - ")[0];
    const endTime = slots[i + span - 1].split(" - ")[1];
    merged.push({
      data: cell,
      timeLabel: `${endTime} - ${startTime}`,
    });
    i += span;
  }
  return merged;
}

export default function Timetable() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeSubject, setActiveSubject] = useState(0);
  const levelData = TIMETABLE[activeLevel];

  const allSlots = [...TIME_SLOTS.morning, ...TIME_SLOTS.evening];
  const currentSubject = levelData.comingSoon
    ? null
    : levelData.subjects[activeSubject];

  return (
    <section className="timetable-section" id="timetable">
      <div className="ts-header fade-up">
        <p className="section-label section-label--center">برنامج الدروس</p>
        <h2 className="section-title section-title--center">
          التوقيت الأسبوعي حسب المادة
        </h2>
      </div>

      {/* Level Tabs */}
      <div className="timetable-tabs fade-up">
        {TIMETABLE.map((item, index) => (
          <button
            key={item.id}
            className={`tt-tab ${activeLevel === index ? "active" : ""}`}
            onClick={() => {
              setActiveLevel(index);
              setActiveSubject(0);
            }}
          >
            {item.level}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {levelData.comingSoon ? (
        <div className="tt-coming-soon">
          <div className="tt-cs-icon">🔜</div>
          <h3 className="tt-cs-title">قريباً</h3>
          <p className="tt-cs-text">
            سيتم نشر برنامج {levelData.level} قريباً. ترقبونا!
          </p>
        </div>
      ) : (
        <>
          {/* Subject Tabs */}
          <div className="tt-subject-tabs">
            {levelData.subjects.map((subj, idx) => (
              <button
                key={idx}
                className={`tt-subject-tab ${activeSubject === idx ? "active" : ""}`}
                onClick={() => setActiveSubject(idx)}
              >
                <span>{subj.name}</span>
              </button>
            ))}
          </div>

          {/* Single Full Table for the selected subject */}
          {currentSubject && (
            <div key={currentSubject.name} className="tt-subject-card">
              <div className="tt-subject-header">
                <span className="tt-subject-icon">{currentSubject.icon}</span>
                <h3 className="tt-subject-title">{currentSubject.name}</h3>
              </div>

              {/* Desktop Table */}
              <div className="tt-subject-table-wrap">
                <table className="tt-subject-table">
                  <thead>
                    <tr>
                      <th className="tt-st-corner">اليوم</th>
                      {allSlots.map((slot, idx) => {
                        const [start, end] = slot.split(" - ");
                        return (
                          <th key={idx} className="tt-st-time">
                            {end} - {start}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day, dIdx) => {
                      const merged = getMergedCells(
                        currentSubject.schedule,
                        day,
                        allSlots
                      );
                      return (
                        <tr key={dIdx} className="tt-st-row">
                          <td className="tt-st-day">{day}</td>
                          {merged.map((cell, cIdx) =>
                            cell.data ? (
                              <td
                                key={cIdx}
                                className="tt-st-cell tt-st-filled"
                                colSpan={cell.span}
                              >
                                <div className="tt-st-cell-content">
                                  <span className="tt-st-class">
                                    {cell.data.class}
                                  </span>
                                  <span className="tt-st-teacher">
                                    أستاذ {cell.data.teacher}
                                  </span>
                                </div>
                              </td>
                            ) : (
                              <td key={cIdx} className="tt-st-cell">
                                <span className="tt-st-empty">—</span>
                              </td>
                            )
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="tt-subject-mobile">
                {DAYS.map((day, dIdx) => {
                  const sessions = getMergedSessions(
                    currentSubject.schedule,
                    day,
                    allSlots
                  );

                  if (sessions.length === 0) return null;

                  return (
                    <div key={dIdx} className="tt-sm-day-group">
                      <div className="tt-sm-day-label">{day}</div>
                      {sessions.map((session, sIdx) => (
                        <div key={sIdx} className="tt-sm-session">
                          <div className="tt-sm-time">
                            {session.timeLabel}
                          </div>
                          <div className="tt-sm-info">
                            <span className="tt-sm-class">
                              {session.data.class}
                            </span>
                            <span className="tt-sm-teacher">
                              أستاذ {session.data.teacher}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* If no sessions at all for this subject */}
                {DAYS.every((day) =>
                  allSlots.every(
                    (slot) => !currentSubject.schedule[day]?.[slot]
                  )
                ) && (
                  <div className="tt-sm-empty-msg">
                    <span>📋</span>
                    <p>لا توجد حصص لهذه المادة حالياً</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

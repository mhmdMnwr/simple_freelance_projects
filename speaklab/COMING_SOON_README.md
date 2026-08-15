# How to Remove the "Coming Soon" Overlays

This guide explains how to remove the "Coming Soon" widget from the **Teachers** and **Timetable** sections.

---

## 1. Teachers Section

**File:** `app/components/TeachersCarousel.js`

### Remove the overlay

Delete this block (around lines 19–27):

```jsx
{/* Coming Soon Overlay */}
<div className="coming-soon-overlay">
  <div className="coming-soon-badge">
    <div className="coming-soon-icon">🎓</div>
    <span className="coming-soon-text">قريبًا</span>
    <span className="coming-soon-sub">سيتم الإعلان عن الأساتذة قريبًا</span>
  </div>
</div>
```

### Remove the wrapper class

On the `<section>` tag, change:

```jsx
<section className="teachers-section coming-soon-wrapper" id="teachers">
```

to:

```jsx
<section className="teachers-section" id="teachers">
```

### Re-enable the carousel

The carousel is currently frozen. To restore it, replace the **entire file** with the original version that includes:

- `useCallback` and `useEffect` imports
- `goTeacher` function for sliding
- `switchDept` function for switching departments
- Auto-slide `useEffect` with `setInterval`
- `onClick` handlers on arrows, dots, and tabs (remove `disabled` from all buttons)

The original carousel code is in your git history — run:

```bash
git checkout HEAD~2 -- app/components/TeachersCarousel.js
```

Then just make sure the `<section>` tag does **not** have `coming-soon-wrapper` class.

---

## 2. Timetable Section

**File:** `app/components/Timetable.js`

### Remove the overlay

Delete this block (around lines 17–24):

```jsx
{/* Coming Soon Overlay */}
<div className="coming-soon-overlay coming-soon-overlay--light">
  <div className="coming-soon-badge">
    <div className="coming-soon-icon">📅</div>
    <span className="coming-soon-text">قريبًا</span>
    <span className="coming-soon-sub">سيتم نشر البرنامج الأسبوعي قريبًا</span>
  </div>
</div>
```

### Remove the wrapper class

On the `<section>` tag, change:

```jsx
<section className="timetable-section coming-soon-wrapper" id="timetable">
```

to:

```jsx
<section className="timetable-section" id="timetable">
```

---

## 3. (Optional) Clean up CSS

Once both overlays are removed, you can delete the "COMING SOON OVERLAY WIDGET" section from `app/globals.css` — it's at the very bottom of the file. Search for:

```css
/* =================================================================
   COMING SOON OVERLAY WIDGET
   ================================================================= */
```

Delete everything from that comment to the end of the file.

---

**That's it!** Save all files and the sections will be fully interactive again.

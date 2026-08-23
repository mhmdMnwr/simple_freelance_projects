const mongoose = require('mongoose');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/khotwa');
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;

  // Clear existing data to avoid duplicates, except admins
  await db.collection('levels').deleteMany({});
  await db.collection('classspecialties').deleteMany({});
  await db.collection('subjects').deleteMany({});
  await db.collection('teachers').deleteMany({});
  await db.collection('sessions').deleteMany({});
  console.log('Cleared existing data');

  // 1. Levels
  const levels = [
    { name: 'الطور الابتدائي', _id: new mongoose.Types.ObjectId() },
    { name: 'الطور المتوسط', _id: new mongoose.Types.ObjectId() },
    { name: 'الطور الثانوي', _id: new mongoose.Types.ObjectId() }
  ];
  await db.collection('levels').insertMany(levels.map(l => ({ ...l, createdAt: new Date(), updatedAt: new Date() })));

  // 2. Classes
  const classes = [];
  const primaryClasses = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة'];
  const middleClasses = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة'];
  const highClasses = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة'];

  primaryClasses.forEach(name => classes.push({ name, levelId: levels[0]._id, _id: new mongoose.Types.ObjectId() }));
  middleClasses.forEach(name => classes.push({ name, levelId: levels[1]._id, _id: new mongoose.Types.ObjectId() }));
  highClasses.forEach(name => classes.push({ name, levelId: levels[2]._id, _id: new mongoose.Types.ObjectId() }));
  
  await db.collection('classspecialties').insertMany(classes.map(c => ({ ...c, createdAt: new Date(), updatedAt: new Date() })));

  // 3. Teachers
  const teachers = [
    { name: 'أحمد بن علي', phone: '0555000001', _id: new mongoose.Types.ObjectId(), subjectIds: [] },
    { name: 'فاطمة الزهراء', phone: '0555000002', _id: new mongoose.Types.ObjectId(), subjectIds: [] },
    { name: 'محمد الأمين', phone: '0555000003', _id: new mongoose.Types.ObjectId(), subjectIds: [] },
    { name: 'سمير خيضر', phone: '0555000004', _id: new mongoose.Types.ObjectId(), subjectIds: [] },
    { name: 'زينب منصوري', phone: '0555000005', _id: new mongoose.Types.ObjectId(), subjectIds: [] },
    { name: 'ياسين بلعربي', phone: '0555000006', _id: new mongoose.Types.ObjectId(), subjectIds: [] }
  ];

  // 4. Subjects
  const subjectsData = [
    { name: 'رياضيات', teacherIndex: 0 },
    { name: 'لغة عربية', teacherIndex: 1 },
    { name: 'فيزياء', teacherIndex: 2 },
    { name: 'لغة إنجليزية', teacherIndex: 3 },
    { name: 'علوم طبيعية', teacherIndex: 4 },
    { name: 'لغة فرنسية', teacherIndex: 5 }
  ];

  const subjects = [];
  classes.forEach(cls => {
    subjectsData.forEach(sd => {
      const subjectId = new mongoose.Types.ObjectId();
      subjects.push({
        _id: subjectId,
        name: sd.name,
        classId: cls._id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      teachers[sd.teacherIndex].subjectIds.push(subjectId);
    });
  });

  await db.collection('subjects').insertMany(subjects);
  await db.collection('teachers').insertMany(teachers.map(t => ({ ...t, createdAt: new Date(), updatedAt: new Date() })));

  // 5. Sessions
  const sessions = [];
  const days = ['Friday', 'Saturday'];
  const times = [
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '13:00', end: '15:00' }
  ];

  classes.forEach(cls => {
    const clsSubjects = subjects.filter(s => s.classId.equals(cls._id));
    let tIndex = 0;
    days.forEach(day => {
      times.forEach(time => {
        if (tIndex < clsSubjects.length) {
          const subject = clsSubjects[tIndex];
          const teacher = teachers.find(t => t.subjectIds.some(id => id.equals(subject._id)));
          sessions.push({
            dayOfWeek: day,
            startTime: time.start,
            endTime: time.end,
            subjectId: subject._id,
            teacherId: teacher._id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          tIndex++;
        }
      });
    });
  });

  await db.collection('sessions').insertMany(sessions);
  console.log(`Seeded ${levels.length} levels, ${classes.length} classes, ${teachers.length} teachers, ${subjects.length} subjects, and ${sessions.length} sessions.`);
  
  mongoose.connection.close();
}

seed().catch(console.error);

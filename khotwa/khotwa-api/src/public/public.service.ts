import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement, AnnouncementDocument } from '../announcements/announcement.schema';
import { Session, SessionDocument } from '../sessions/session.schema';
import { Level, LevelDocument } from '../levels/level.schema';
import { ClassSpecialty, ClassSpecialtyDocument } from '../classes/class-specialty.schema';
import { Subject, SubjectDocument } from '../subjects/subject.schema';
import { Student, StudentDocument } from '../students/student.schema';
import { Teacher, TeacherDocument } from '../teachers/teacher.schema';
import { CreateStudentDto } from '../students/student.dto';

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly announcementModel: Model<AnnouncementDocument>,
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
    @InjectModel(Level.name)
    private readonly levelModel: Model<LevelDocument>,
    @InjectModel(ClassSpecialty.name)
    private readonly classModel: Model<ClassSpecialtyDocument>,
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  async getAnnouncements() {
    return this.announcementModel.find().sort({ createdAt: -1 }).exec();
  }

  async getTimetable() {
    return this.sessionModel
      .find()
      .populate('teacherId')
      .populate({
        path: 'subjectId',
        populate: {
          path: 'classId',
          populate: { path: 'levelId' },
        },
      })
      .exec();
  }

  async getLevels() {
    const levels = await this.levelModel.find().lean().exec();
    const allClasses = await this.classModel.find().lean().exec();
    const allSubjects = await this.subjectModel.find().lean().exec();

    return levels.map((level) => {
      const classes = allClasses
        .filter((c) => String(c.levelId) === String(level._id))
        .map((cls) => ({
          ...cls,
          subjects: allSubjects.filter(
            (s) => String(s.classId) === String(cls._id),
          ),
        }));
      return { ...level, classes };
    });
  }

  async registerStudent(dto: CreateStudentDto) {
    return this.studentModel.create(dto);
  }

  async getTeachers() {
    return this.teacherModel
      .find()
      .populate({
        path: 'subjectIds',
        populate: {
          path: 'classId',
          populate: { path: 'levelId' },
        },
      })
      .exec();
  }
}

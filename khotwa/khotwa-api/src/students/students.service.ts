import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async findAll() {
    return this.studentModel
      .find()
      .populate('mainLevelId')
      .populate('subjectIds')
      .exec();
  }

  async findById(id: string) {
    const student = await this.studentModel
      .findById(id)
      .populate('mainLevelId')
      .populate('subjectIds')
      .exec();
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto) {
    const existingStudent = await this.studentModel.findOne({
      phone: dto.phone,
      firstName: dto.firstName,
      lastName: dto.lastName,
      mainLevelId: dto.mainLevelId,
    });

    if (existingStudent) {
      const currentSubjects = existingStudent.subjectIds.map((id) => id.toString());
      const newSubjects = dto.subjectIds || [];
      const allSubjects = Array.from(new Set([...currentSubjects, ...newSubjects]));
      
      existingStudent.subjectIds = allSubjects as any;
      return existingStudent.save();
    }

    return this.studentModel.create(dto);
  }

  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.studentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async delete(id: string) {
    const student = await this.studentModel.findByIdAndDelete(id).exec();
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }
}

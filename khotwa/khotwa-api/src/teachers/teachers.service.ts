import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  async findAll() {
    return this.teacherModel.find().populate('subjectIds').exec();
  }

  async findById(id: string) {
    const teacher = await this.teacherModel
      .findById(id)
      .populate('subjectIds')
      .exec();
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async create(dto: CreateTeacherDto) {
    return this.teacherModel.create(dto);
  }

  async update(id: string, dto: UpdateTeacherDto) {
    const teacher = await this.teacherModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async delete(id: string) {
    const teacher = await this.teacherModel.findByIdAndDelete(id).exec();
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './subject.schema';
import { CreateSubjectDto, UpdateSubjectDto } from './subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
  ) {}

  async findAll() {
    return this.subjectModel
      .find()
      .populate({ path: 'classId', populate: { path: 'levelId' } })
      .exec();
  }

  async findById(id: string) {
    const subject = await this.subjectModel
      .findById(id)
      .populate({ path: 'classId', populate: { path: 'levelId' } })
      .exec();
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async create(dto: CreateSubjectDto) {
    return this.subjectModel.create(dto);
  }

  async update(id: string, dto: UpdateSubjectDto) {
    const subject = await this.subjectModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async delete(id: string) {
    const subject = await this.subjectModel.findByIdAndDelete(id).exec();
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassSpecialty, ClassSpecialtyDocument } from './class-specialty.schema';
import { CreateClassSpecialtyDto, UpdateClassSpecialtyDto } from './class-specialty.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(ClassSpecialty.name)
    private readonly classModel: Model<ClassSpecialtyDocument>,
  ) {}

  async findAll() {
    return this.classModel.find().populate('levelId').exec();
  }

  async findById(id: string) {
    const cls = await this.classModel.findById(id).populate('levelId').exec();
    if (!cls) throw new NotFoundException('ClassSpecialty not found');
    return cls;
  }

  async create(dto: CreateClassSpecialtyDto) {
    return this.classModel.create(dto);
  }

  async update(id: string, dto: UpdateClassSpecialtyDto) {
    const cls = await this.classModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!cls) throw new NotFoundException('ClassSpecialty not found');
    return cls;
  }

  async delete(id: string) {
    const cls = await this.classModel.findByIdAndDelete(id).exec();
    if (!cls) throw new NotFoundException('ClassSpecialty not found');
    return cls;
  }
}

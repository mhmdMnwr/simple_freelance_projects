import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level, LevelDocument } from './level.schema';
import { CreateLevelDto, UpdateLevelDto } from './level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectModel(Level.name)
    private readonly levelModel: Model<LevelDocument>,
  ) {}

  async findAll() {
    return this.levelModel.find().exec();
  }

  async findById(id: string) {
    const level = await this.levelModel.findById(id).exec();
    if (!level) throw new NotFoundException('Level not found');
    return level;
  }

  async create(dto: CreateLevelDto) {
    return this.levelModel.create(dto);
  }

  async update(id: string, dto: UpdateLevelDto) {
    const level = await this.levelModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!level) throw new NotFoundException('Level not found');
    return level;
  }

  async delete(id: string) {
    const level = await this.levelModel.findByIdAndDelete(id).exec();
    if (!level) throw new NotFoundException('Level not found');
    return level;
  }
}

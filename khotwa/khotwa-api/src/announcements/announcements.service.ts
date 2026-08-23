import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement, AnnouncementDocument } from './announcement.schema';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly announcementModel: Model<AnnouncementDocument>,
  ) {}

  async findAll() {
    return this.announcementModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    const announcement = await this.announcementModel.findById(id).exec();
    if (!announcement) throw new NotFoundException('Announcement not found');
    return announcement;
  }

  async create(dto: CreateAnnouncementDto) {
    return this.announcementModel.create(dto);
  }

  async update(id: string, dto: UpdateAnnouncementDto) {
    const announcement = await this.announcementModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!announcement) throw new NotFoundException('Announcement not found');
    return announcement;
  }

  async delete(id: string) {
    const announcement = await this.announcementModel
      .findByIdAndDelete(id)
      .exec();
    if (!announcement) throw new NotFoundException('Announcement not found');
    return announcement;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.schema';
import { CreateSessionDto, UpdateSessionDto } from './session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async findAll() {
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

  async findById(id: string) {
    const session = await this.sessionModel
      .findById(id)
      .populate('teacherId')
      .populate({
        path: 'subjectId',
        populate: {
          path: 'classId',
          populate: { path: 'levelId' },
        },
      })
      .exec();
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async create(dto: CreateSessionDto) {
    return this.sessionModel.create(dto);
  }

  async update(id: string, dto: UpdateSessionDto) {
    const session = await this.sessionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async delete(id: string) {
    const session = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }
}

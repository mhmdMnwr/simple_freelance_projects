import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Subject } from '../subjects/subject.schema';
import { Teacher } from '../teachers/teacher.schema';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: true })
export class Session {
  @Prop({ type: String, required: true })
  dayOfWeek!: string;

  @Prop({ type: String, required: true })
  startTime!: string;

  @Prop({ type: String, required: true })
  endTime!: string;

  @Prop({ type: Types.ObjectId, ref: Subject.name, required: true })
  subjectId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Teacher.name, required: true })
  teacherId!: Types.ObjectId;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

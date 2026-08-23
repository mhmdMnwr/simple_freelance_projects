import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Subject } from '../subjects/subject.schema';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, enum: ['Male', 'Female'], required: true })
  sex!: string;

  @Prop({ type: String, required: false })
  imageUrl?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Subject.name }] })
  subjectIds!: Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

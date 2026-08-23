import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Level } from '../levels/level.schema';
import { Subject } from '../subjects/subject.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student {
  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: Number, required: true })
  age!: number;

  @Prop({ type: String, enum: ['Male', 'Female'], required: true })
  sex!: string;

  @Prop({ type: String, required: true })
  phone!: string;

  @Prop({ type: Types.ObjectId, ref: Level.name, required: true })
  mainLevelId!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Subject.name }] })
  subjectIds!: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);

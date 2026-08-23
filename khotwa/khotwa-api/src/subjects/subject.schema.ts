import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ClassSpecialty } from '../classes/class-specialty.schema';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: Types.ObjectId, ref: ClassSpecialty.name, required: true })
  classId!: Types.ObjectId;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

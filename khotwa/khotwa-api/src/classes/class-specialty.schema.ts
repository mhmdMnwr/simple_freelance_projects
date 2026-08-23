import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Level } from '../levels/level.schema';

export type ClassSpecialtyDocument = HydratedDocument<ClassSpecialty>;

@Schema({ timestamps: true })
export class ClassSpecialty {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: Types.ObjectId, ref: Level.name, required: true })
  levelId!: Types.ObjectId;
}

export const ClassSpecialtySchema =
  SchemaFactory.createForClass(ClassSpecialty);

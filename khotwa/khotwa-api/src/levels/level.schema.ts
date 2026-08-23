import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LevelDocument = HydratedDocument<Level>;

@Schema({ timestamps: true })
export class Level {
  @Prop({ type: String, required: true, unique: true })
  name!: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);

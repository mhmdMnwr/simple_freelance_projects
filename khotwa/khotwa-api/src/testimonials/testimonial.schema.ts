import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ type: String, required: true })
  imageUrl!: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);

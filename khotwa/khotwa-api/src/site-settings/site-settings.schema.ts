import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SiteSettingsDocument = HydratedDocument<SiteSettings>;

@Schema({ timestamps: true })
export class SiteSettings {
  @Prop({ type: String, required: true, unique: true, default: 'main' })
  key!: string;

  @Prop({ type: String })
  logoUrl?: string;
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);

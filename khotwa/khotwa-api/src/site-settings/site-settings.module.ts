import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSettings, SiteSettingsSchema } from './site-settings.schema';
import { SiteSettingsService } from './site-settings.service';
import { SiteSettingsController } from './site-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SiteSettings.name, schema: SiteSettingsSchema }]),
  ],
  controllers: [SiteSettingsController],
  providers: [SiteSettingsService],
  exports: [MongooseModule],
})
export class SiteSettingsModule {}

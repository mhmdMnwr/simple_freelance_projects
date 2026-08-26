import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteSettings, SiteSettingsDocument } from './site-settings.schema';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectModel(SiteSettings.name)
    private readonly settingsModel: Model<SiteSettingsDocument>,
  ) {}

  async getSettings() {
    let settings = await this.settingsModel.findOne({ key: 'main' }).exec();
    if (!settings) {
      settings = await this.settingsModel.create({ key: 'main' });
    }
    return settings;
  }

  async updateLogo(logoUrl: string) {
    const settings = await this.settingsModel.findOneAndUpdate(
      { key: 'main' },
      { logoUrl },
      { new: true, upsert: true },
    ).exec();
    return settings;
  }
}

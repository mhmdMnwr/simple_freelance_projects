import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from '../auth/admin.schema';
import { Level, LevelDocument } from '../levels/level.schema';
import { ClassSpecialty, ClassSpecialtyDocument } from '../classes/class-specialty.schema';

interface LevelSeed {
  name: string;
  classCount: number;
}

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Level.name)
    private readonly levelModel: Model<LevelDocument>,
    @InjectModel(ClassSpecialty.name)
    private readonly classModel: Model<ClassSpecialtyDocument>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedAdmin();
    await this.seedLevelsAndClasses();
  }

  private async seedAdmin(): Promise<void> {
    const adminCount = await this.adminModel.countDocuments().exec();
    if (adminCount > 0) {
      this.logger.log('Admin already exists, skipping seed.');
      return;
    }

    const username = this.configService.get<string>('ADMIN_USER', 'admin');
    const password = this.configService.get<string>(
      'ADMIN_PASS',
      'admin123',
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.adminModel.create({ username, password: hashedPassword });
    this.logger.log(`Admin user "${username}" seeded successfully.`);
  }

  private async seedLevelsAndClasses(): Promise<void> {
    const levelCount = await this.levelModel.countDocuments().exec();
    if (levelCount > 0) {
      this.logger.log('Levels already exist, skipping seed.');
      return;
    }

    const levelSeeds: LevelSeed[] = [
      { name: 'Elementary', classCount: 5 },
      { name: 'Middle School', classCount: 4 },
      { name: 'High School', classCount: 3 },
    ];

    for (const seed of levelSeeds) {
      const level = await this.levelModel.create({ name: seed.name });

      const classes = Array.from({ length: seed.classCount }, (_, i) => ({
        name: `Year ${i + 1}`,
        levelId: level._id,
      }));

      await this.classModel.insertMany(classes);
      this.logger.log(
        `Level "${seed.name}" with ${seed.classCount} classes seeded.`,
      );
    }
  }
}

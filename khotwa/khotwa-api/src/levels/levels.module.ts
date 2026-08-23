import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';
import { Level, LevelSchema } from './level.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [MongooseModule],
})
export class LevelsModule {}

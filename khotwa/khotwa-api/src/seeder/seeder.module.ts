import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeederService } from './seeder.service';
import { AuthModule } from '../auth/auth.module';
import { LevelsModule } from '../levels/levels.module';
import { ClassesModule } from '../classes/classes.module';

@Module({
  imports: [ConfigModule, AuthModule, LevelsModule, ClassesModule],
  providers: [SeederService],
})
export class SeederModule {}

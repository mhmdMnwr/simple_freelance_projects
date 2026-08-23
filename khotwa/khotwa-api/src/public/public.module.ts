import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { AnnouncementsModule } from '../announcements/announcements.module';
import { SessionsModule } from '../sessions/sessions.module';
import { LevelsModule } from '../levels/levels.module';
import { ClassesModule } from '../classes/classes.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    AnnouncementsModule,
    SessionsModule,
    LevelsModule,
    ClassesModule,
    SubjectsModule,
    StudentsModule,
    TeachersModule,
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LevelsModule } from './levels/levels.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { SessionsModule } from './sessions/sessions.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { PublicModule } from './public/public.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) throw new Error('MONGO_URI is not defined in the environment variables');
        return { uri };
      },
    }),
    AuthModule,
    LevelsModule,
    ClassesModule,
    SubjectsModule,
    TeachersModule,
    StudentsModule,
    SessionsModule,
    AnnouncementsModule,
    PublicModule,
    SeederModule,
  ],
})
export class AppModule {}

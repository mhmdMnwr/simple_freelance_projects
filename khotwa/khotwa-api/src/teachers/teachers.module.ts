import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { Teacher, TeacherSchema } from './teacher.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [MongooseModule],
})
export class TeachersModule {}

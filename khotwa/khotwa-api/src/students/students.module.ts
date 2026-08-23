import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student, StudentSchema } from './student.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [MongooseModule],
})
export class StudentsModule {}

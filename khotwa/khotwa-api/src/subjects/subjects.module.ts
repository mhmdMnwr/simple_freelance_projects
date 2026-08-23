import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { Subject, SubjectSchema } from './subject.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [MongooseModule],
})
export class SubjectsModule {}

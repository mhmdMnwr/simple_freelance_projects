import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassSpecialty, ClassSpecialtySchema } from './class-specialty.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: ClassSpecialty.name, schema: ClassSpecialtySchema },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [MongooseModule],
})
export class ClassesModule {}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';

@ApiTags('Admin / Students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  findById(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a student' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student' })
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  delete(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}

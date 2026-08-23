import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PublicService } from './public.service';
import { CreateStudentDto } from '../students/student.dto';

@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('announcements')
  @ApiOperation({ summary: 'Get all announcements (public)' })
  getAnnouncements() {
    return this.publicService.getAnnouncements();
  }

  @Get('timetable')
  @ApiOperation({
    summary: 'Get full timetable with teacher, subject, class, and level details',
  })
  getTimetable() {
    return this.publicService.getTimetable();
  }

  @Get('levels')
  @ApiOperation({
    summary: 'Get all levels with classes and subjects for registration form',
  })
  getLevels() {
    return this.publicService.getLevels();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new student' })
  registerStudent(@Body() dto: CreateStudentDto) {
    return this.publicService.registerStudent(dto);
  }

  @Get('teachers')
  @ApiOperation({ summary: 'Get all teachers with subjects (public)' })
  getTeachers() {
    return this.publicService.getTeachers();
  }
}

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
import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';

@ApiTags('Admin / Teachers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get teacher by ID' })
  findById(@Param('id') id: string) {
    return this.teachersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a teacher' })
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a teacher' })
  update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    return this.teachersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  delete(@Param('id') id: string) {
    return this.teachersService.delete(id);
  }
}

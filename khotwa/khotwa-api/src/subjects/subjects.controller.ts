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
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto, UpdateSubjectDto } from './subject.dto';

@ApiTags('Admin / Subjects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subject by ID' })
  findById(@Param('id') id: string) {
    return this.subjectsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a subject' })
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subject' })
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subject' })
  delete(@Param('id') id: string) {
    return this.subjectsService.delete(id);
  }
}

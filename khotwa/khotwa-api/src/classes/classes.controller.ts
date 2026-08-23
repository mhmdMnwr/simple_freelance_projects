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
import { ClassesService } from './classes.service';
import { CreateClassSpecialtyDto, UpdateClassSpecialtyDto } from './class-specialty.dto';

@ApiTags('Admin / Classes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all classes/specialties' })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get class by ID' })
  findById(@Param('id') id: string) {
    return this.classesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a class/specialty' })
  create(@Body() dto: CreateClassSpecialtyDto) {
    return this.classesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a class/specialty' })
  update(@Param('id') id: string, @Body() dto: UpdateClassSpecialtyDto) {
    return this.classesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class/specialty' })
  delete(@Param('id') id: string) {
    return this.classesService.delete(id);
  }
}

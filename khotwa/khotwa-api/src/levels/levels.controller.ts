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
import { LevelsService } from './levels.service';
import { CreateLevelDto, UpdateLevelDto } from './level.dto';

@ApiTags('Admin / Levels')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all levels' })
  findAll() {
    return this.levelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get level by ID' })
  findById(@Param('id') id: string) {
    return this.levelsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a level' })
  create(@Body() dto: CreateLevelDto) {
    return this.levelsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a level' })
  update(@Param('id') id: string, @Body() dto: UpdateLevelDto) {
    return this.levelsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a level' })
  delete(@Param('id') id: string) {
    return this.levelsService.delete(id);
  }
}

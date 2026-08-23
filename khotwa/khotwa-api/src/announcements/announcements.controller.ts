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
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcement.dto';

@ApiTags('Admin / Announcements')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all announcements' })
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get announcement by ID' })
  findById(@Param('id') id: string) {
    return this.announcementsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an announcement' })
  create(@Body() dto: CreateAnnouncementDto) {
    return this.announcementsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an announcement' })
  update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an announcement' })
  delete(@Param('id') id: string) {
    return this.announcementsService.delete(id);
  }
}

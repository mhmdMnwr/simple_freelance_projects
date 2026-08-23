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
import { SessionsService } from './sessions.service';
import { CreateSessionDto, UpdateSessionDto } from './session.dto';

@ApiTags('Admin / Sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session by ID' })
  findById(@Param('id') id: string) {
    return this.sessionsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a session' })
  create(@Body() dto: CreateSessionDto) {
    return this.sessionsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session' })
  update(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.sessionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session' })
  delete(@Param('id') id: string) {
    return this.sessionsService.delete(id);
  }
}

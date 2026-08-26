import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './testimonial.dto';

@ApiTags('Admin / Testimonials')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a testimonial' })
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a testimonial' })
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a testimonial' })
  delete(@Param('id') id: string) {
    return this.testimonialsService.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial, TestimonialDocument } from './testimonial.schema';
import { CreateTestimonialDto, UpdateTestimonialDto } from './testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: Model<TestimonialDocument>,
  ) {}

  findAll() {
    return this.testimonialModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    const doc = await this.testimonialModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Testimonial not found');
    return doc;
  }

  create(dto: CreateTestimonialDto) {
    return this.testimonialModel.create(dto);
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    const doc = await this.testimonialModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!doc) throw new NotFoundException('Testimonial not found');
    return doc;
  }

  async delete(id: string) {
    const doc = await this.testimonialModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Testimonial not found');
    return { deleted: true };
  }
}

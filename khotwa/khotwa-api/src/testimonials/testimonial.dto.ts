import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}

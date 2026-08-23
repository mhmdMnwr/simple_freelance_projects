import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Ahmed Benali' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female'] })
  @IsIn(['Male', 'Female'])
  @IsNotEmpty()
  sex!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: ['64a1b2c3d4e5f6a7b8c9d0e1'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subjectIds?: string[];
}

export class UpdateTeacherDto {
  @ApiProperty({ example: 'Ahmed Benali', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female'], required: false })
  @IsIn(['Male', 'Female'])
  @IsOptional()
  sex?: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: ['64a1b2c3d4e5f6a7b8c9d0e1'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subjectIds?: string[];
}

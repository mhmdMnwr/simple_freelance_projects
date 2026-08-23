import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Mohamed' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Khalifi' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 14 })
  @IsNumber()
  age!: number;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female'] })
  @IsIn(['Male', 'Female'])
  @IsNotEmpty()
  sex!: string;

  @ApiProperty({ example: '0555123456' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsMongoId()
  @IsNotEmpty()
  mainLevelId!: string;

  @ApiProperty({
    example: ['64a1b2c3d4e5f6a7b8c9d0e1'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  subjectIds!: string[];
}

export class UpdateStudentDto {
  @ApiProperty({ example: 'Mohamed', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Khalifi', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 14, required: false })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({
    example: 'Male',
    enum: ['Male', 'Female'],
    required: false,
  })
  @IsIn(['Male', 'Female'])
  @IsOptional()
  sex?: string;

  @ApiProperty({ example: '0555123456', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1', required: false })
  @IsMongoId()
  @IsOptional()
  mainLevelId?: string;

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

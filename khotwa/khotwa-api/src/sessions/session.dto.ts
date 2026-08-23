import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsIn } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ example: 'Sunday' })
  @IsString()
  @IsNotEmpty()
  dayOfWeek!: string;

  @ApiProperty({ example: '08:00' })
  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  @IsNotEmpty()
  endTime!: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsMongoId()
  @IsNotEmpty()
  subjectId!: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsMongoId()
  @IsNotEmpty()
  teacherId!: string;
}

export class UpdateSessionDto {
  @ApiProperty({ example: 'Sunday', required: false })
  @IsString()
  @IsOptional()
  dayOfWeek?: string;

  @ApiProperty({ example: '08:00', required: false })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({ example: '10:00', required: false })
  @IsString()
  @IsOptional()
  endTime?: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1', required: false })
  @IsMongoId()
  @IsOptional()
  subjectId?: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1', required: false })
  @IsMongoId()
  @IsOptional()
  teacherId?: string;
}

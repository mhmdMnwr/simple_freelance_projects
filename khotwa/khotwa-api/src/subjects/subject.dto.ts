import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsMongoId()
  @IsNotEmpty()
  classId!: string;
}

export class UpdateSubjectDto {
  @ApiProperty({ example: 'Physics', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1', required: false })
  @IsMongoId()
  @IsOptional()
  classId?: string;
}

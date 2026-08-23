import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateClassSpecialtyDto {
  @ApiProperty({ example: 'Year 1' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsMongoId()
  @IsNotEmpty()
  levelId!: string;
}

export class UpdateClassSpecialtyDto {
  @ApiProperty({ example: 'Year 2', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1', required: false })
  @IsMongoId()
  @IsOptional()
  levelId?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ example: 'Elementary' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateLevelDto {
  @ApiProperty({ example: 'Elementary', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}

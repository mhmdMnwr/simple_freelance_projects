import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({ example: 'Rentrée Scolaire 2025' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Les inscriptions commencent le 1er Septembre.' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateAnnouncementDto {
  @ApiProperty({ example: 'Rentrée Scolaire 2025', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Les inscriptions commencent le 1er Septembre.',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

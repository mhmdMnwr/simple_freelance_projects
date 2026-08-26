import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SiteSettingsService } from './site-settings.service';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLogoDto {
  @ApiProperty({ example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsNotEmpty()
  logoUrl!: string;
}

export class UpdateCoversDto {
  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsOptional()
  heroBgUrl?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsOptional()
  aboutImgUrl?: string;
}

@ApiTags('Admin / Site Settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/settings')
export class SiteSettingsController {
  constructor(private readonly settingsService: SiteSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get site settings' })
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch('logo')
  @ApiOperation({ summary: 'Update the site logo' })
  updateLogo(@Body() dto: UpdateLogoDto) {
    return this.settingsService.updateLogo(dto.logoUrl);
  }

  @Patch('covers')
  @ApiOperation({ summary: 'Update the site covers (Hero & About)' })
  updateCovers(@Body() dto: UpdateCoversDto) {
    return this.settingsService.updateCovers(dto.heroBgUrl, dto.aboutImgUrl);
  }
}

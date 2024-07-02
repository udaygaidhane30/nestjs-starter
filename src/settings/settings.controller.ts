import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './models/setting.model';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';

@Controller('settings')
@UseGuards(BasicAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto): Promise<Setting> {
    return this.settingsService.create(createSettingDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.settingsService.remove(id);
  }
}

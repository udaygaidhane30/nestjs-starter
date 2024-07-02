import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Setting } from './models/setting.model';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting)
    private settingModel: typeof Setting,
  ) {}

  private validateValue(dataType: string, value: any): void {
    if (
      (dataType === 'boolean' && typeof value !== 'boolean') ||
      (dataType === 'string' && typeof value !== 'string') ||
      (dataType === 'number' && typeof value !== 'number')
    ) {
      throw new BadRequestException('Value does not match data type');
    }
  }

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    this.validateValue(createSettingDto.data_type, createSettingDto.value);
    return this.settingModel.create({
      ...createSettingDto,
      value: createSettingDto.value.toString(),
    });
  }

  async update(
    id: number,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    const setting = await this.settingModel.findByPk(id);

    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    this.validateValue(updateSettingDto.data_type, updateSettingDto.value);
    if (updateSettingDto.value) {
      updateSettingDto = {
        ...updateSettingDto,
        value: updateSettingDto.value.toString(),
      };
    }
    await setting.update(updateSettingDto);

    return setting;
  }

  async remove(id: number): Promise<void> {
    const setting = await this.settingModel.findByPk(id);

    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    await setting.destroy();
  }
}

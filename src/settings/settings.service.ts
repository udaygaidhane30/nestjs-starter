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

  private validateValue(dataType: string, value: any): string {
    if (dataType !== typeof value) {
      throw new BadRequestException('Value does not match data type');
    }
    const validatedValue =
      dataType == 'object' ? JSON.stringify(value) : value.toString();
    return validatedValue;
  }

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const value = this.validateValue(
      createSettingDto.data_type,
      createSettingDto.value,
    );
    return this.settingModel.create({
      ...createSettingDto,
      value,
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

    const value = this.validateValue(updateSettingDto.data_type, updateSettingDto.value);
    if (updateSettingDto.value) {
      updateSettingDto = {
        ...updateSettingDto,
        value,
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

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Setting } from './models/setting.model';
import { Account } from 'src/accounts/models/account.model';

@Module({
  imports: [SequelizeModule.forFeature([Setting, Account])],
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}

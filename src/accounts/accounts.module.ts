import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './models/account.model';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}

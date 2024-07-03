import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './models/account.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const existingAccount = await this.accountModel.findOne({
      where: { name: createAccountDto.name },
    });

    if (existingAccount) {
      throw new ConflictException('Account name already exists');
    }

    return this.accountModel.create(createAccountDto);
  }
}

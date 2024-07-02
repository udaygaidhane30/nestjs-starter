import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsPositive,
} from 'class-validator';
import { DataType } from '../enums/data-type.enum';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(DataType)
  @IsNotEmpty()
  readonly data_type: DataType;

  @IsInt()
  @IsPositive()
  readonly account_id: number;

  @IsNotEmpty()
  readonly value: string;
}

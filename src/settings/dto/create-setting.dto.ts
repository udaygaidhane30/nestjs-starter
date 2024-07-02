import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsPositive,
} from 'class-validator';
import { DataType } from '../../constants/data-type.enum';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(DataType)
  readonly data_type: DataType;

  @IsInt()
  @IsPositive()
  readonly account_id: number;

  @IsNotEmpty()
  readonly value: string;
}

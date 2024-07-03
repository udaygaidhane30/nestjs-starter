import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DataType } from "src/constants/data-type.enum";

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(DataType)
  readonly data_type: DataType;

  @IsNotEmpty()
  readonly value: string | number | boolean | object;
}

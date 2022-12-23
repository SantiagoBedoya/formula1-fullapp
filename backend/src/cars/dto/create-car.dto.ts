import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsUUID()
  readonly predecessor?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly engineName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly tires: string;
}

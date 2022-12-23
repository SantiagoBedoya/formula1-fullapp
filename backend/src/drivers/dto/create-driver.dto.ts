import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dob: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly placeOfBirth: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly points: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly podiums: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly worldChampions: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly team: string;
}

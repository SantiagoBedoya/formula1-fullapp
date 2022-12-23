import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly shortName: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly base: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly teamChief: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly technicalChief: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly chasis: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly powerUnit: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly firstTeamEntry: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly worldChampions: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly highestRaceFinish: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly polePositions: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly fastestLaps: number;
}

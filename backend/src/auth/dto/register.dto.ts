import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

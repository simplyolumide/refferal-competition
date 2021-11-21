import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  referrer?: string;
}

export default RegisterDto;

import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  gender: string;

  @IsString()
  password: string;
}

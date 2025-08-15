import { Gender } from '@prisma/client';
import { IsString, IsEmail, IsDateString, IsIn } from 'class-validator';

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
  @IsIn(['Male', 'Female'], { message: 'Gender must be either Male or Female' })
  gender: Gender;

  @IsString()
  password: string;
}

import { Gender } from '@prisma/client';
import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  @IsIn(['Male', 'Female'], { message: 'Gender must be either Male or Female' })
  gender: Gender;
}

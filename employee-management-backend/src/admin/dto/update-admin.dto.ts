import { Gender } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsIn,
} from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsString()
  @IsIn(['Male', 'Female'], { message: 'Gender must be either Male or Female' })
  gender?: Gender;

  @IsOptional()
  @IsString()
  password?: string;
}

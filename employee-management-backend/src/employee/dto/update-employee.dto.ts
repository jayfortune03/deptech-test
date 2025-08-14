import { IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsNumber()
  salary: number;
}

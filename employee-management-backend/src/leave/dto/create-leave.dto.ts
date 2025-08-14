import { IsNumber, IsString } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  reason: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsNumber()
  employeeId: number;
}

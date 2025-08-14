import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleLeaveException } from 'src/interceptors/handleLeave.interceptor';

@Injectable()
export class LeaveService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateWorkDays(startDate: Date, endDate: Date): number {
    let count = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  }

  private async validateMaxLeaveDays(
    employeeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const yearStart = new Date(`${startDate.getFullYear()}-01-01`);
    const yearEnd = new Date(`${startDate.getFullYear()}-12-31`);

    const leaves = await this.prisma.leave.findMany({
      where: {
        employeeId: employeeId,
        startDate: {
          gte: yearStart,
        },
        endDate: {
          lte: yearEnd,
        },
      },
    });

    const totalLeaveDays = leaves.reduce((total, leave) => {
      return (
        total +
        this.calculateWorkDays(
          new Date(leave.startDate),
          new Date(leave.endDate),
        )
      );
    }, 0);

    const newLeaveDays = this.calculateWorkDays(startDate, endDate);

    if (totalLeaveDays + newLeaveDays > 12) {
      throw new HandleLeaveException('Max leave on this year is 12!', 400);
    }
  }

  private async validateLeavePerMonth(
    employeeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const leaveMonth = startDate.getMonth();
    const leaves = await this.prisma.leave.findMany({
      where: {
        employeeId: employeeId,
        startDate: {
          gte: new Date(`${startDate.getFullYear()}-${leaveMonth + 1}-01`),
        },
        endDate: {
          lte: new Date(`${startDate.getFullYear()}-${leaveMonth + 1}-31`),
        },
      },
    });

    if (leaves.length > 0) {
      throw new HandleLeaveException(
        'Leave are taken more than 1 for this month!',
        400,
      );
    }
  }

  async create(createLeaveDto: CreateLeaveDto) {
    const startDate = new Date(createLeaveDto.startDate);
    const endDate = new Date(createLeaveDto.endDate);
    const employeeId = createLeaveDto.employeeId;

    await this.validateMaxLeaveDays(employeeId, startDate, endDate);
    await this.validateLeavePerMonth(employeeId, startDate, endDate);

    const totalWorkDays = this.calculateWorkDays(startDate, endDate);

    return this.prisma.leave.create({
      data: {
        reason: createLeaveDto.reason,
        startDate,
        endDate,
        employeeId,
        totalWorkDays,
      },
    });
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto) {
    const startDate = new Date(updateLeaveDto.startDate);
    const endDate = new Date(updateLeaveDto.endDate);
    const employeeId = updateLeaveDto.employeeId;

    await this.validateMaxLeaveDays(employeeId, startDate, endDate);
    await this.validateLeavePerMonth(employeeId, startDate, endDate);

    const totalWorkDays = this.calculateWorkDays(startDate, endDate);

    return this.prisma.leave.update({
      where: { id },
      data: {
        reason: updateLeaveDto.reason,
        startDate,
        endDate,
        totalWorkDays,
      },
    });
  }

  async getLeavesByEmployee(employeeId: number) {
    return this.prisma.leave.findMany({
      where: {
        employeeId: employeeId,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.leave.delete({
      where: { id },
    });
  }
}

import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto) {
    const data = await this.leaveService.create(createLeaveDto);
    return {
      status: 201,
      message: 'success create leave',
      data,
    };
  }

  @Get('employee/:employeeId')
  async getLeavesByEmployee(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    const data = await this.leaveService.getLeavesByEmployee(employeeId);
    return {
      status: 200,
      message: 'success get leave data',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ) {
    const data = await this.leaveService.update(id, updateLeaveDto);
    return {
      status: 200,
      message: 'success update leave data',
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.leaveService.delete(id);

    return {
      status: 200,
      message: 'success delete leave data',
      data,
    };
  }
}

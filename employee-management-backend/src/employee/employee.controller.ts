import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    const data = await this.employeeService.create(dto);
    return {
      status: 201,
      message: 'success create employee',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('rowsPerPage', ParseIntPipe) rowsPerPage = 5,
  ) {
    const data = await this.employeeService.findAll(page, rowsPerPage);
    return {
      status: 200,
      message: 'success get all employee',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.employeeService.findOne(id);
    return {
      status: 200,
      message: 'success get one employee',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeDto,
  ) {
    const data = await this.employeeService.update(id, dto);

    return {
      status: 200,
      message: 'success update employee',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.employeeService.remove(id);

    return {
      status: 200,
      message: 'success delete employee',
      data,
    };
  }
}

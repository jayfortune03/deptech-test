import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({ data: dto });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const employees = await this.prisma.employee.findMany({
      skip,
      take: limit,
    });

    const totalEmployees = await this.prisma.employee.count();

    return {
      employees,
      totalEmployees,
    };
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee)
      throw new NotFoundException(`Employee with id ${id} not found`);
    return employee;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    await this.findOne(id);
    return this.prisma.employee.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.employee.delete({ where: { id } });
  }
}

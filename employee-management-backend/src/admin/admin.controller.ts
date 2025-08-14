import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get()
  async findAll() {
    const data = await this.adminService.findAll();
    return {
      status: 200,
      message: 'success get all admins',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.adminService.findOne(id);

    return {
      status: 200,
      message: 'success get one admin',
      data,
    };
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const data = await this.adminService.create(createAdminDto);

    return {
      status: 201,
      message: 'success create admin',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const data = await this.adminService.update(id, updateAdminDto);

    return {
      status: 200,
      message: 'success update admin',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.adminService.remove(id);

    return {
      status: 200,
      message: 'success delete admin',
      data,
    };
  }
}

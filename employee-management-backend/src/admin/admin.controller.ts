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
  Query,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import type { Request } from 'express';
import { HandleLeaveException } from 'src/interceptors/handleLeave.interceptor';

@Controller('admins')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('rowsPerPage', ParseIntPipe) rowsPerPage = 5,
  ) {
    const data = await this.adminService.findAll(page, rowsPerPage);
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
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const loggedInUser = req?.user as { id: number };

    if (loggedInUser?.id === id) {
      throw new HandleLeaveException(`You cannot delete yourself!`, 400);
    }
    const data = [];

    return {
      status: 200,
      message: 'success delete admin',
      data,
    };
  }
}

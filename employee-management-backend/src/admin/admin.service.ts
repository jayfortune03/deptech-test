import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);

    return this.prisma.admin.create({
      data: {
        ...createAdminDto,
        password: hashedPassword,
      },
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const admins = await this.prisma.admin.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        email: true,
        gender: true,
        password: false,
      },
    });

    const totalAdmins = await this.prisma.admin.count();

    return {
      admins,
      totalAdmins,
    };
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        email: true,
        gender: true,
        password: false,
      },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt();
      updateAdminDto.password = await bcrypt.hash(
        updateAdminDto.password,
        salt,
      );
    }

    return this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number): Promise<void> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    await this.prisma.admin.delete({
      where: { id },
    });
  }
}

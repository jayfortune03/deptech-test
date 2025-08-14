import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  // Fungsi untuk mendapatkan semua admin
  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  // Fungsi untuk membuat admin baru
  async create(adminData: Partial<Admin>): Promise<Admin> {
    const admin = this.adminRepository.create(adminData);
    return this.adminRepository.save(admin);
  }

  // Fungsi untuk update profil admin
  async update(id: number, adminData: Partial<Admin>): Promise<Admin> {
    await this.adminRepository.update(id, adminData);
    return this.adminRepository.findOne(id);
  }

  // Fungsi untuk menghapus admin
  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}

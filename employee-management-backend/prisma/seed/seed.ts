import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('password123', salt);

  const admin = await prisma.admin.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: '1980-01-01T00:00:00Z',
      gender: 'Male',
      password: hashedPassword,
    },
  });

  const employee1 = await prisma.employee.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St, Springfield, IL',
      gender: 'Female',
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob.smith@example.com',
      phoneNumber: '0987654321',
      address: '456 Elm St, Springfield, IL',
      gender: 'Male',
    },
  });

  const employee3 = await prisma.employee.create({
    data: {
      firstName: 'Charlie',
      lastName: 'Davis',
      email: 'charlie.davis@example.com',
      phoneNumber: '1122334455',
      address: '789 Oak St, Springfield, IL',
      gender: 'Male',
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

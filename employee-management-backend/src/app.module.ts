import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'leave_management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
    // EmployeeModule,
    // LeaveModule,
  ],
})
export class AppModule {}

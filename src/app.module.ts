import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { configService } from './config/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';


require('dotenv').config();

@Module({
  imports: [
    UserModule,Repository,
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false, // Desactivar sincronización automática
    }),
    AuthModule,
    
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, ConfigService], 
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

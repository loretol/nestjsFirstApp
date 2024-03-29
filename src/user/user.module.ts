import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Asegúrate de importar la entidad User
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports: [TypeOrmModule.forFeature([User]),],
    
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService,TypeOrmModule],
})
export class UserModule { }

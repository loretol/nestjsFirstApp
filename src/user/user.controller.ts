// user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Req, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users') // Ruta base para las operaciones CRUD de usuarios
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() newUser: UserDto): Promise<UserDto> { 
    return this.userService.createUser(newUser);
  }

  @Get()
  findAll(@Req() request: Request): Promise<UserDto[]> { 
    return this.userService.findAll(request.query);
     
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() newUser: UserDto, 
  ): Promise<UserDto> {
    return this.userService.updateUser(id, newUser);
  }

  
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
  
}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  //*********** llamar todos los usuarios********* */
  async findAll(params): Promise<User[]> {
    return await this.userRepository.find();
  }

  //***************** traer usuario por id************* */
  async findone(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  //********** encriptación********* */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
 
  //********crear usario********** */
  async createUser(newUser: UserDto): Promise<User> {
    const userId = uuidv4(); // Genera un UUID único
    const user = new User();
    user.id = userId;
    user.name = newUser.name;
    user.last_name = newUser.last_name;
    user.user_name = newUser.user_name;
    user.password = await this.hashPassword(newUser.password);
    user.phone = newUser.phone;
    user.restore = newUser.restore;
    user.active = newUser.active;
    return await this.userRepository.save(user); 
  }
  //********** actualizar usuario ********** */
  async updateUser(id: string, newUser: UserDto): Promise<User> {
    let toUpdate = await this.userRepository.findOne({ where: { id: id } });
    let updated = Object.assign(toUpdate, newUser);
    return this.userRepository.save(updated);
  }



  //*********** elimina usuario ********** */
  async deleteUser(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }


}

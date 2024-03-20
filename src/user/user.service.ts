
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource,
    
  ) { }

  //*********** llamar todos los usuarios********* */
  async findAll(params): Promise<UserDto[]> {
    const connection = this.dataSource.manager.connection;
    return await connection.query('SELECT * FROM users');
  }



  //***************** traer usuario por id************* */
  async findOne(id: string): Promise<UserDto> {
    const connection = await this.dataSource.manager.connection;
    return await connection.query('SELECT * FROM users WHERE id = $1', [id]);

  }

  //********** encriptación********* */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  //********crear usario********** */
  async createUser(newUser: UserDto): Promise<UserDto> {
    const userId = uuidv4();
    const hashedPassword = await this.hashPassword(newUser.password);
    const connection = await this.dataSource.manager.connection;

    const query = `
        INSERT INTO users (id, name, last_name, user_name, password, phone)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
    await connection.query(query, [
      userId,
      newUser.name,
      newUser.last_name,
      newUser.user_name,
      hashedPassword,
      newUser.phone,
    ]);
    return { id: userId, ...newUser };
  }
  //********** actualizar usuario ********** */
  async updateUser(id: string, newUser: UserDto): Promise<UserDto> {
    const connection = await this.dataSource.manager.connection;
    
      const query = `
        UPDATE users
        SET name = $1, last_name = $2, user_name = $3, phone = $4
        WHERE id = $5
      `;
      await connection.query(query, [
        newUser.name,
        newUser.last_name,
        newUser.user_name,
        newUser.phone,
        id,
      ]);
      return { id, ...newUser };
    
  }



  //*********** elimina usuario ********** */
  async deleteUser(id: string): Promise<void> {
    const connection = await this.dataSource.manager.connection;
    
      const query = 'DELETE FROM users WHERE id = $1';
      await connection.query(query, [id]);
    
  }
}




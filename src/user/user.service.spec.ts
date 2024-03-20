import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DataSource } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  

  // Escribe pruebas similares para otros métodos como findOne, createUser, updateUser, deleteUser, etc.
});

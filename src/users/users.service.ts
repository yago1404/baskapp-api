import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/domain/models/dtos/createUser.dto';
import { UserEntity } from '../shared/infra/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const users: { email: string; password: string }[] = [
  { email: 'ytaveiros@gmail.com', password: '123456' },
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async authenticate(email: string, password: string): Promise<boolean> {
    const user = users.find(
      (value) => value.email === email && value.password === password,
    );
    return user !== undefined;
  }

  async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = this.repository.create(newUser);
    return await this.repository.save(userEntity);
  }
}

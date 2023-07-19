import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/domain/models/dtos/createUser.dto';
import { UserEntity } from '../shared/infra/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async authenticate(email: string, password: string): Promise<UserEntity> {
    return await this.repository.findOneBy({
      email,
      password,
    });
  }

  async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    const previousUser: UserEntity = await this.repository.findOneBy({
      email: newUser.email,
    });
    if (previousUser) {
      throw new ConflictException('Usuário ja possui cadastro');
    }

    const userEntity: UserEntity = this.repository.create(newUser);
    return await this.repository.save(userEntity);
  }

  async updateRefreshToken(
    user: UserEntity,
    refreshToken: string,
  ): Promise<void> {
    user['lastRefreshToken'] = refreshToken;
    await this.repository.save(user);
  }
}

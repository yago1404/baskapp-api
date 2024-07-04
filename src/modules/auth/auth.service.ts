import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggedDto } from './dtos/logged.dto';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dtos/login.dto';
import { AppUserEntity } from '../../shared/entities/app-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AppUserEntity)
    private appUserRepository: Repository<AppUserEntity>,
  ) {}

  async doLogin(loginDto: LoginDto): Promise<LoggedDto> {
    const user: AppUserEntity = await this.appUserRepository.findOneBy({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (!user) {
      throw new NotFoundException('Email ou senha inválidos');
    }
    const token: string = this.generateToken(user.id);
    const refreshToken: string = this.generateRefreshToken();

    user.refreshToken = refreshToken;
    await this.appUserRepository.save(user);

    const cleanedUser: AppUserEntity = this.clearUser(user);
    return new LoggedDto(token, refreshToken, cleanedUser);
  }

  private generateRefreshToken(): string {
    let result: string = '';
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = 286;
    let counter: number = 0;
    while (counter < charactersLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  private generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '20m' });
  }

  private clearUser(user: AppUserEntity): AppUserEntity {
    delete user.password;
    delete user.role;
    delete user.refreshToken;

    return user;
  }
}

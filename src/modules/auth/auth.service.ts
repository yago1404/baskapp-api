import { Injectable } from '@nestjs/common';
import { LoggedDto } from './dtos/logged.dto';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  async doLogin(loginDto: LoginDto): Promise<LoggedDto> {
    const token: string = this.generateToken('asdasd-asdsad-asdsa-asda');
    const refreshToken: string = this.generateRefreshToken();
    return new LoggedDto(token, refreshToken);
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
}

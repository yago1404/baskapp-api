import { UserEntity } from '../infra/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export abstract class AuthUtil {
  static generateJWT(user: UserEntity): {
    jwt: string;
    refreshToken: string;
  } {
    function generateRefreshToken(): string {
      let token = '';
      for (let i = 0; i < 12; i++) {
        token += (Math.random() * 32).toString(36);
      }
      return token;
    }

    const payload = {
      userId: user.id,
      username: user.name,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    const refreshToken: string = generateRefreshToken();
    return { jwt: token, refreshToken };
  }
}

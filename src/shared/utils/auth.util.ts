import { UserEntity } from '../infra/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export abstract class AuthUtil {
  static generateJWT(user: UserEntity): {
    jwt: string;
    refreshToken: string;
  } {
    const payload = {
      userId: user.id,
      username: user.name,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return { jwt: token, refreshToken: '' };
  }
}

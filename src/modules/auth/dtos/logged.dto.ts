import { AppUserEntity } from '../../../shared/entities/app-user.entity';

export class LoggedDto {
  token: string;
  refreshToken: string;
  user: AppUserEntity;

  constructor(token: string, refreshToken: string, user: AppUserEntity) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}

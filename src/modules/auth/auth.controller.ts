import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ResponseModel } from '../../shared/entities/models/response.model';
import { LoggedDto } from './dtos/logged.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginDtoPipe } from './pipes/login-dto.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(LoginDtoPipe)
  async login(@Body() body: LoginDto): Promise<ResponseModel<LoggedDto>> {
    const data: LoggedDto = await this.authService.doLogin(body);
    return ResponseModel.ok<LoggedDto>(data);
  }
}

import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { CustomResponse } from '../shared/domain/models/custom_response/custom.response';
import { UsersService } from './users.service';
import { AuthUtil } from '../shared/utils/auth.util';
import { CreateUserDto } from '../shared/domain/models/dtos/createUser.dto';
import { CreateUserDtoPipe } from '../shared/infra/pipes/createUserDto.pipe';
import { UserEntity } from '../shared/infra/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/auth')
  async auth(@Res() res, @Body() body): Promise<Response> {
    const { email, password } = body;
    if (!email || !password) {
      return res
        .status(400)
        .json(
          new CustomResponse(
            400,
            'Bad Request, enter with valid Email and Password',
          ),
        );
    }
    const user: UserEntity = await this.service.authenticate(email, password);
    if (user) {
      const { jwt, refreshToken }: any = AuthUtil.generateJWT(user);
      return res.status(200).json(
        new CustomResponse(200, 'Success', {
          token: jwt,
          refreshToken: refreshToken,
        }),
      );
    }
    return res
      .status(404)
      .json(new CustomResponse(404, 'Email ou senha inválidos'));
  }

  @Post()
  @UsePipes(new CreateUserDtoPipe())
  async create(@Res() res, @Body() newUser: CreateUserDto): Promise<Response> {
    try {
      const user: UserEntity = await this.service.createUser(newUser);
      const { jwt, refreshToken } = AuthUtil.generateJWT(user);
      return res.status(200).json(
        new CustomResponse(200, 'Success', {
          token: jwt,
          refreshToken: refreshToken,
          user,
        }),
      );
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json(new CustomResponse(500, 'Internal Server Error'));
    }
  }
}

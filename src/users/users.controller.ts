import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
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
    const haveUser: boolean = await this.service.authenticate(email, password);
    if (haveUser) {
      const token: string = AuthUtil.generateJWT();
      return res.status(200).json(
        new CustomResponse(200, 'Success', {
          token: token,
          refreshToken: 'asdasdasd',
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
      return res.status(200).json(
        new CustomResponse(200, 'Success', {
          token: 'ASDADJDAKJNSKAD',
          refreshToken: 'asdasdasd',
          user,
        }),
      );
    } catch (e) {
      return res
        .status(500)
        .json(new CustomResponse(500, 'Internal Server Error'));
    }
  }
}

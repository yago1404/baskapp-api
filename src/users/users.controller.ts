import {
  Body,
  ConflictException,
  Controller,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { CustomResponse } from '../shared/domain/models/custom_response/custom.response';
import { UsersService } from './users.service';
import { AuthUtil } from '../shared/utils/auth.util';
import { CreateUserDto } from '../shared/domain/models/dtos/createUser.dto';
import { CreatePlayerDtoPipe } from '../shared/infra/pipes/createPlayerDtoPipe';
import { UserEntity } from '../shared/infra/entities/user.entity';
import {CreateCoachDtoPipe} from "../shared/infra/pipes/createCoachDtoPipe";

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

  @Post('/coach')
  @UsePipes(new CreateCoachDtoPipe())
  async createCoach(@Res() res, @Body() newUser: CreateUserDto): Promise<CustomResponse> {
    try {
      const user: UserEntity = await this.service.createUser(newUser);
      const { jwt, refreshToken } = AuthUtil.generateJWT(user);
      await this.service.updateRefreshToken(user, refreshToken);
      delete user.password;
      delete user.lastRefreshToken;
      return res.status(200).json(
          new CustomResponse(200, 'Success', {
            token: jwt,
            refreshToken: refreshToken,
            user,
          }),
      );
    } catch (e) {
      if (e instanceof ConflictException) {
        return res.status(409).json(new CustomResponse(409, e.message));
      }
      return res
          .status(500)
          .json(new CustomResponse(500, 'Internal Server Error'));
    }
  }

  @Post()
  @UsePipes(new CreatePlayerDtoPipe())
  async create(@Res() res, @Body() newUser: CreateUserDto): Promise<Response> {
    try {
      const user: UserEntity = await this.service.createUser(newUser);
      const { jwt, refreshToken } = AuthUtil.generateJWT(user);
      await this.service.updateRefreshToken(user, refreshToken);
      delete user.password;
      delete user.lastRefreshToken;
      return res.status(200).json(
        new CustomResponse(200, 'Success', {
          token: jwt,
          refreshToken: refreshToken,
          user,
        }),
      );
    } catch (e) {
      if (e instanceof ConflictException) {
        return res.status(409).json(new CustomResponse(409, e.message));
      }
      return res
        .status(500)
        .json(new CustomResponse(500, 'Internal Server Error'));
    }
  }
}

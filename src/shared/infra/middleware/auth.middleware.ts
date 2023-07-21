import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const [bearer, token] = req.headers['authorization'].split(' ');

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Refaça o login');
    }

    try {
      const decoded: string = await jwt.verify(token, process.env.SECRET_KEY);
      req['userId'] = decoded['userId'];
      next();
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido.');
    }
  }
}

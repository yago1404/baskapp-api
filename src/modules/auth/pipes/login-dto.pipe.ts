import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ValidatorsUtil } from '../../../shared/utils/validators.util';

export class LoginDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.email === undefined) {
      throw new BadRequestException('Email é obrigatório');
    } else if (!ValidatorsUtil.isEmail(value.email)) {
      throw new BadRequestException('Campo email inválido');
    }

    if (value.password === undefined || value.password === '') {
      throw new BadRequestException('Senha é obrigatória');
    }

    return value;
  }
}

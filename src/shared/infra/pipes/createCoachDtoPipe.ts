import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../domain/models/dtos/createUser.dto';

export class CreateCoachDtoPipe implements PipeTransform {
  transform(value: any): CreateUserDto {
    const { name, email, password, height, weight, wingspan, rule, birthday } =
      value;

    if (!name || !email || !password || !rule || !birthday) {
      throw new BadRequestException('Missing required fields');
    }

    return new CreateUserDto(
      name,
      email,
      password,
      height,
      weight,
      wingspan,
      rule,
      birthday,
    );
  }
}

import {Body, Controller, Post, Res} from '@nestjs/common';
import {CustomResponse} from "../shared/domain/models/custom.response";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Post('/auth')
    async auth(@Res() res, @Body() body): Promise<any> {
        const { email, password } = body;
        let haveUser: boolean = await this.service.authenticate(email, password);
        if (haveUser) return res.status(200).json(new CustomResponse(200, 'Success', { token: 'ASDADJDAKJNSKAD', refreshToken: 'asdasdasd'}));
        return res.status(404).json(new CustomResponse(404, 'Email ou senha inválidos'));
    }

    @Post()
    async create(@Res() res, @Body() body): Promise<any> {
        const { email, password } = body;
        let haveUser: boolean = await this.service.authenticate(email, password);
        if (haveUser) return res.status(200).json(new CustomResponse(200, 'Success', { token: 'ASDADJDAKJNSKAD', refreshToken: 'asdasdasd'}));
        return res.status(404).json(new CustomResponse(404, 'Email ou senha inválidos'));
    }
}

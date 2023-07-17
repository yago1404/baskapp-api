import {Body, Controller, Post, Res} from '@nestjs/common';
import {CustomResponse} from "../shared/domain/models/custom_response/custom.response";
import {UsersService} from "./users.service";
import {AuthUtil} from "../shared/utils/auth.util";

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Post('/auth')
    async auth(@Res() res, @Body() body): Promise<any> {
        const { email, password } = body;
        if (!email || !password) {
            return res.status(400).json(new CustomResponse(400, 'Bad Request, enter with valid Email and Password'));
        }
        let haveUser: boolean = await this.service.authenticate(email, password);
        if (haveUser) {
            const token: string = AuthUtil.generateJWT();
            return res.status(200).json(new CustomResponse(200, 'Success', {
                token: token,
                refreshToken: 'asdasdasd'
            }));
        }
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

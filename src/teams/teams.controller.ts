import {Body, Controller, Delete, Get, Param, Post, Put, Res} from '@nestjs/common';
import {TeamsService} from "./teams.service";
import {CustomResponse} from "../shared/domain/models/custom.response";

@Controller('teams')
export class TeamsController {
    constructor(private service: TeamsService) {}
    @Get()
    async getTeams(@Res() res): Promise<Response> {
        return res.status(200).json(new CustomResponse(200, 'Success'));
    }

    @Post()
    async createTeam(@Res() res, @Body() newTeam: Object): Promise<Response> {
        const teamName: string = await this.service.test();
        return res.status(200).json(new CustomResponse(
            200,
            'Success',
            {
                teams: [
                    {
                        name: teamName
                    }
                ]
            }
        ));
    }

    @Put('/:id')
    async updateTeam(@Res() res, @Param() id: number, @Body() newParams: Object): Promise<Response> {
        return res.status(200).json(new CustomResponse(200, 'Success', {team: newParams}));
    }

    @Delete('/:id')
    async deleteTeam(@Res() res, @Param() id: number): Promise<Response> {
        return res.status(204).json();
    }
}

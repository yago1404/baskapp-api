import {Body, Controller, Delete, Get, Param, Post, Put, Res} from '@nestjs/common';
import {TeamsService} from "./teams.service";

@Controller('teams')
export class TeamsController {
    constructor(private service: TeamsService) {}
    @Get()
    async getTeams(@Res() res): Promise<Response> {
        return res.status(200).json({statusCode: 200, data: {teams: []}});
    }

    @Post()
    async createTeam(@Res() res, @Body() newTeam: Object): Promise<Response> {
        const teamName: string = await this.service.test();
        return res.status(200).json({statusCode: 200, data: {team: {name: teamName}}});
    }

    @Put('/:id')
    async updateTeam(@Res() res, @Param() id: number, @Body() newParams: Object): Promise<Response> {
        console.log(id);
        console.log(newParams);
        return res.status(200).json({statusCode: 200, data: {team: {}}});
    }

    @Delete('/:id')
    async deleteTeam(@Res() res, @Param() id: number): Promise<Response> {
        console.log(id);
        return res.status(200).json({statusCode: 200, data: {team: {}}});
    }
}

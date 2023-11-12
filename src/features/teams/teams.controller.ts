import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CustomResponse } from '../../shared/domain/models/custom_response/custom.response';
import { Response } from 'express';

@Controller('teams')
export class TeamsController {
  constructor(private service: TeamsService) {}
  @Get()
  async getTeams(@Res() res: Response): Promise<Response> {
    return res.status(200).json(new CustomResponse(200, 'Success'));
  }

  @Post()
  async createTeam(
    @Res() res: Response,
    @Body() newTeam: any,
  ): Promise<Response> {
    const teamName: string = await this.service.test();
    return res.status(200).json(
      new CustomResponse(200, 'Success', {
        teams: [
          {
            name: teamName,
          },
        ],
      }),
    );
  }

  @Put('/:id')
  async updateTeam(
    @Res() res: Response,
    @Param() id: number,
    @Body() newParams: any,
  ): Promise<Response> {
    return res
      .status(200)
      .json(new CustomResponse(200, 'Success', { team: newParams }));
  }

  @Delete('/:id')
  async deleteTeam(
    @Res() res: Response,
    @Param() id: number,
  ): Promise<Response> {
    return res.status(204).json();
  }
}

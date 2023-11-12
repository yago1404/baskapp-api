import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  async test(): Promise<any> {
    return 'test';
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TeamsModule, UsersModule, TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "yago1404",
    "database": "baskapp",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

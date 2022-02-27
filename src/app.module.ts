import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BoardModule} from "./module/board/board.module";
import {TypeOrmModule} from "@nestjs/typeorm";

const config = {
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true,
  logging: true,
  keepConnectionAlive: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      type: 'mysql',
      host: process.env.DB_HOST,
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

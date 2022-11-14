import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardController } from './app.BoardController';

@Module({
  imports: [],
  controllers: [AppController, BoardController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import Canvas from './canvas/canvas';
import { CourseController } from './course.controller';
import { TaskController } from './task.controller';
import { BoardController } from './board.controller';
import Prisma from './Data/Prisma';
import DB from './Data/db';

@Module({
  imports: [],
  controllers: [CourseController, TaskController, BoardController],
  providers: [Prisma, Canvas, DB],
})
export class AppModule {}

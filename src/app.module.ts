import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import Canvas from './canvas/canvas';
import { AssignmentController } from './assignment.controller';
import { CourseController } from './course.controller';
import { TaskController } from './task.controller';
import { BoardController } from './board.controller';
import Prisma from './Data/Prisma';
import DB from './Data/db';

@Module({
  imports: [],
  controllers: [CourseController, TaskController, AssignmentController, BoardController],
  providers: [Prisma, Canvas, DB],
})
export class AppModule {}

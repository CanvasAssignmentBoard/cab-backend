import { Module } from '@nestjs/common';
import Canvas from './canvas/canvas';
import { CourseController } from './course.controller';
import { TaskController } from './task.controller';
import { BoardController } from './board.controller';
import { AssignmentController } from './assignment.controller';
import Prisma from './Data/Prisma';
import DB from './Data/db';
import AssignmentLogic from './Logic/AssignmentLogic';
import { RowController } from './row.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [
    CourseController,
    TaskController,
    BoardController,
    AssignmentController,
    RowController
  ],
  providers: [Prisma, Canvas, DB],
})
export class AppModule {}

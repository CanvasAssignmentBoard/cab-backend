import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Canvas from './canvas/canvas';
import { AssignmentController } from './assignment.controller';
import { CourseController } from './course.controller';
import { TaskController } from './task.controller';

@Module({
  imports: [],
  controllers: [AppController, CourseController, TaskController, AssignmentController],
  providers: [AppService, Canvas],
})
export class AppModule {}

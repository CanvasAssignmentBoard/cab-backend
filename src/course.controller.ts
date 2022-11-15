import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import Course from './models/Course';
@Controller("course")
export class CourseController {
  constructor(private readonly canvasService: Canvas) {}

  @Get()
  async getAllCourses(){
     return await this.canvasService.GetCourses();
  }

}

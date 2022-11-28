import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Canvas from './canvas/canvas'
import ICourseLogic from './Logic/ICourseLogic';
import CourseLogic from './Logic/CourseLogic';
@Controller("course")
export class CourseController {
  courseLogic : ICourseLogic;
  constructor(private readonly canvasService: Canvas) {
    this.courseLogic = new CourseLogic(canvasService);
  }

  @Get()
  async getAllCourses(){
     return await this.courseLogic.GetCourses();
  }

}

import { Controller, Get } from '@nestjs/common';
import Canvas from './canvas/canvas'
import ICourseLogic from './Logic/ICourseLogic';
import CourseLogic from './Logic/CourseLogic';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller("course")
export class CourseController {
  courseLogic : ICourseLogic;
  constructor(private readonly canvasService: Canvas) {
    this.courseLogic = new CourseLogic(canvasService);
  }

  @ApiOperation({ summary :"Get all courses for a user"})
  @Get()
  async getAllCourses(){
     return await this.courseLogic.GetCourses();
  }

}

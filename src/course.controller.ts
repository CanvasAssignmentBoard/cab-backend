import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import Course from './models/Course';
@Controller("course")
export class CourseController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllCourses(): Course[]{
    let courses: Course[] = [
      new Course(1,"CourseName1"),
      new Course(2,"CourseName2"),
      new Course(3,"CourseName3"),
    ];

    return courses;
  }

}

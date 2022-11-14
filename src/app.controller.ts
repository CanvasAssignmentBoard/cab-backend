import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const test : Canvas = new Canvas();
    test.GetCourses();
    return this.appService.getHello();
  }

  @Get("getAllAssignmentsForCourses")
  getAllAssignmentsForCourses(): Assignment[]{
    let assignments: Assignment[] = [
      new Assignment(1,"AssignmentName1","Description1",new Date(), new Date(), new Date(), 1, 1),
      new Assignment(2,"AssignmentName2","Description2",new Date(), new Date(), new Date(), 2, 2),
      new Assignment(3,"AssignmentName3","Description3",new Date(), new Date(), new Date(), 3, 3),
    ];

    return assignments;
  }

  @Get("getAllTasksForAssignment")
  getAllTasksForAssignment(): Task[]{
    let tasks: Task[] = [
      new Task(1,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
      new Task(2,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
      new Task(3,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
    ];

    return tasks;
  }
}

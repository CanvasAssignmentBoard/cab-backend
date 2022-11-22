import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import {main} from './Data/db'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const test : Canvas = new Canvas();
    test.GetAssignments(12798);
    return this.appService.getHello();
  }

  @Get("test")
  getAllAssignmentsForCourses(): Assignment[]{
    main();

    return;
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

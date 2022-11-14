import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
@Controller("Task")
export class TaskController {
  constructor(private readonly appService: AppService) {}

  @Get("GetAll")
  getAllTasksForAssignment(): Task[]{
    let tasks: Task[] = [
      new Task(1,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
      new Task(2,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
      new Task(3,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
    ];

    return tasks;
  }

  @Get("Filter")
  getFilteredForAssignment(): Task[]{
    let tasks: Task[] = [
      new Task(1,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
      new Task(2,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
      new Task(3,"TaskName1","Description1",new Date(), new Date(), new Date(), "status", 1),
    ];

    return tasks;
  }
}

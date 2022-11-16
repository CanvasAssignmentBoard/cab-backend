import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import { GetTasks, CreateTasks } from './Data/db';
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import { randomUUID } from 'crypto';

@Controller("Task")
export class TaskController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  async getAllTasksForAssignment(@Body() id : string){
    return await GetTasks(id);
  }

  @Get("Create")
  async CreateTasksForAssignment(@Body() task : CreateTaskBody){
    await CreateTasks(randomUUID(), task.AssignmentId, task.Status, task.Name);
    return true;
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

import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import { randomUUID } from 'crypto';
import ITaskLogic from './Logic/ITaskLogic';
import { TaskLogic } from './Logic/TaskLogic';
import DB from './Data/db';

@Controller("Task")
export class TaskController {
  taskLogic : ITaskLogic;
  constructor(canvasService: Canvas, dataBaseService : DB) {
    this.taskLogic = new TaskLogic(canvasService, dataBaseService); 
  }

  @Get("")
  async getAllTasksForAssignment(@Body() id : string){
    return await this.taskLogic.GetTasks(id);
  }

  @Get("Create")
  async CreateTasksForAssignment(@Body() task : CreateTaskBody){
    await this.taskLogic.CreateTask(task);
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

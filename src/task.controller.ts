import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import { randomUUID } from 'crypto';
import ITaskLogic from './Logic/ITaskLogic';
import { TaskLogic } from './Logic/TaskLogic';
import DB from './Data/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller("Task")
export class TaskController {
  taskLogic : ITaskLogic;
  constructor(canvasService: Canvas, dataBaseService : DB) {
    this.taskLogic = new TaskLogic(canvasService, dataBaseService); 
  }

  @ApiOperation({ summary :"Get all tasks"})
  @Get("")
  async getAllTasksForAssignment(@Body() id : string){
    return await this.taskLogic.GetTasks(id);
  }

  @ApiOperation({ summary :"Create a task for an assignment"})
  @Post("Create")
  async CreateTasksForAssignment(@Body() task : CreateTaskBody){
    await this.taskLogic.CreateTask(task);
    return true;
  }

  @ApiOperation({ summary :"Edit task for an assignment"})
  @Post("Edit")
  async EditTasksForAssignment(@Body() task : CreateTaskBody){
    await this.taskLogic.Edit(task);
    return true;
  }
}

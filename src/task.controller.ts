import { Controller, Get, Body, Post, Param, Delete } from '@nestjs/common';
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
  @Get(":id")
  async getAllTasksForAssignment(@Param() params){
    console.log(params.id)
    return await this.taskLogic.GetTasks(params.id);
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
    
    return await this.taskLogic.Edit(task);
  }

  @ApiOperation({ summary :"Delete task for an assignment"})
  @Delete(":id")
  async DeleteTasksForAssignment(@Param() params){
    await this.taskLogic.Delete(params.id);
    return true;
  }
}

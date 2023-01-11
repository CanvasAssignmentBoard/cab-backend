import { HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskBody } from 'src/Bodies/CreateTaskBody';
import ICanvas from 'src/canvas/ICanvas';
import DB from 'src/Data/db';
import ITaskLogic from './ITaskLogic';

export default class TaskLogic implements ITaskLogic {
  constructor(
    private readonly canvasService: ICanvas,
    private readonly dataBaseService: DB,
  ) {}

  async GetTasks(id: string) {
    let tasks = await this.dataBaseService.GetTasks(id);
    if(tasks.length == 0){
      // console.log("No tasks found")
      throw new HttpException('Invalid assignmentID', HttpStatus.BAD_REQUEST);

    }
    return tasks;
  }

  async CreateTask(task: CreateTaskBody) {
    if(task.AssignmentId == undefined){
      throw new HttpException('Missing assignmentID', HttpStatus.BAD_REQUEST);
    }

    if(task.Status == undefined){
      throw new HttpException('Missing Status', HttpStatus.BAD_REQUEST);

    }

    if(task.Name == undefined){
      throw new HttpException('Missing Name', HttpStatus.BAD_REQUEST);

    }

    if(task.DueDate == undefined){
      throw new HttpException('Missing Date', HttpStatus.BAD_REQUEST);

    }
    
    return await this.dataBaseService.CreateTasks(
      randomUUID(),
      task.AssignmentId,
      task.Status,
      task.Name,
      task.DueDate,
    );
  }

  async Edit(id: string, task: CreateTaskBody) {

    if(task.Status == undefined){
      throw new HttpException('Invalid Status', HttpStatus.BAD_REQUEST);

    }

    if(task.Name == undefined){
      throw new HttpException('Invalid Name', HttpStatus.BAD_REQUEST);

    }

    if(task.DueDate == undefined){
      throw new HttpException('Invalid Date', HttpStatus.BAD_REQUEST);

    }

    

    if(await this.dataBaseService.DoesTaskExist(id) < 1){
      throw new HttpException('Invalid TaskID', HttpStatus.BAD_REQUEST);
    }

    await this.dataBaseService.EditTask(
      id,
      task.AssignmentId,
      task.Status,
      task.Name,
      task.DueDate,
    );

    return true;
  }

  async Delete(id: string) {
    if(await this.dataBaseService.DoesTaskExist(id) < 1){
      return false;
    }
    
    return await this.dataBaseService.DeleteTask(id);
  }
}

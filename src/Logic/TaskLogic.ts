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
      console.log("No tasks found")
      return false;
    }
    return tasks;
  }

  async CreateTask(task: CreateTaskBody) {
    if(task.AssignmentId == undefined || task.Status == undefined || task.Name == undefined || task.DueDate == undefined){
      return false;
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
    if(task.AssignmentId == undefined || task.Status == undefined || task.Name == undefined || task.DueDate == undefined){
      return false;
    }

    if(await this.dataBaseService.DoesTaskExist(id) < 1){
      return false;
    }

    return await this.dataBaseService.EditTask(
      id,
      task.AssignmentId,
      task.Status,
      task.Name,
      task.DueDate,
    );
  }

  async Delete(id: string) {
    if(await this.dataBaseService.DoesTaskExist(id) < 1){
      return false;
    }
    
    return await this.dataBaseService.DeleteTask(id);
  }
}

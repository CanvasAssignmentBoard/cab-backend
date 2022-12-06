import { randomUUID } from "crypto";
import { CreateTaskBody } from "src/Bodies/CreateTaskBody";
import ICanvas from "src/canvas/ICanvas";
import DB from "src/Data/db";
import ITaskLogic from "./ITaskLogic";

export class TaskLogic implements ITaskLogic {
    constructor(private readonly canvasService : ICanvas, private readonly dataBaseService : DB){
    }

    async GetTasks(id : string){
      return await this.dataBaseService.GetTasks(id);
    }
  
    async CreateTask(task : CreateTaskBody){
      return await this.dataBaseService.CreateTasks(randomUUID(), task.AssignmentId, task.Status, task.Name, task.DueDate);
    }

    async Edit(task : CreateTaskBody){
      
      return await this.dataBaseService.EditTask(task.AssignmentId, task.Status, task.Name, task.DueDate);
    }
  
    async Delete(id : string){
      
      return await this.dataBaseService.DeleteTask(id);
    }
}
  
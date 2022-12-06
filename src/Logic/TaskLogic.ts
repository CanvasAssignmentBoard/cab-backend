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
      await this.dataBaseService.CreateTasks(randomUUID(), task.AssignmentId, task.Status, task.Name);
      return true;
    }

    async Edit(task : CreateTaskBody){
      await this.dataBaseService.EditTask(task.AssignmentId, task.AssignmentId, task.Status);
      return true;
    }
  
}
  
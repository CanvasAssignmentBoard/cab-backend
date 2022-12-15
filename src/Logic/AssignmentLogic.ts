import { randomUUID } from 'crypto';
import CreateAssignmentBody from 'src/Bodies/CreateAssignmentBody';
import CreateDBAssignment from 'src/Bodies/CreateDBAssignment';
import ICanvas from 'src/canvas/ICanvas';
import DB from 'src/Data/db';
import Assignment from 'src/models/Assignment';
import AssignmentWithTasks from 'src/models/AssignmentWithTask';
import Task from 'src/models/Task';
import IAssignmentLogic from './IAssignmentLogic';

class AssignmentLogic implements IAssignmentLogic {
  constructor(
    private readonly canvasService: ICanvas,
    private readonly dataBaseService: DB,
  ) {}

  async GetAssignment(id : string, courseId : number){
    let _assignment = await this.canvasService.GetAssignment(await (await this.dataBaseService.GetAssignment(id)).canvasId, courseId);
    let tasks = await this.dataBaseService.GetTasks(id);
    let _task : Task[];
    tasks.forEach(element => {
      _task.push(new Task(element.id, element.name, "description", null, null, null,element.status, element.assignmentID))
    })
    return new AssignmentWithTasks(_assignment, tasks);
  }

  async AddAssignmentToBoard(id : string, courseId : number){

  }

  async CreateAssignment(id: CreateAssignmentBody) {
    return 'test';
  }
}
export default AssignmentLogic;

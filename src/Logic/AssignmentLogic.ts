import { randomUUID } from 'crypto';
import CreateAssignmentBody from 'src/Bodies/CreateAssignmentBody';
import CreateDBAssignment from 'src/Bodies/CreateDBAssignment';
import ICanvas from 'src/canvas/ICanvas';
import DB from 'src/Data/db';
import Assignment from 'src/models/Assignment';
import AssignmentWithTasks from 'src/models/AssignmentWithTask';
import Task from 'src/models/Task';
import IAssignmentLogic from './IAssignmentLogic';
import {
  isValidISODateString,
} from 'iso-datestring-validator';

class AssignmentLogic implements IAssignmentLogic {
  constructor(
    private readonly canvasService: ICanvas,
    private readonly dataBaseService: DB,
  ) {}

  async GetAssignment(id : string){
    let assignment = await this.dataBaseService.GetAssignment(id);
    if(assignment == null){
      return false;
    }
    let _assignment = await this.canvasService.GetAssignment(assignment.canvasId, assignment.courseID);
    let tasks = await this.dataBaseService.GetTasks(id);
    if(tasks.length < 1){
      return assignment;
    }
    let _task : Task[];
    tasks.forEach(element => {
      _task.push(new Task(element.id, element.name, "description", null, null, null,element.status, element.assignmentID))
    })
    return new AssignmentWithTasks(_assignment, tasks);
  }

  async CreateAssignment(courseId: number, assignment: CreateAssignmentBody) {
    if(courseId === undefined){
      return false;
    } 

    if(assignment.description !== undefined || assignment.name !== undefined || isValidISODateString(assignment.due_at)){
      return false;
    }

    return this.canvasService.CreateAssignment(courseId, assignment);
  }
}
export default AssignmentLogic;

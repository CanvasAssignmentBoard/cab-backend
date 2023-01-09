import { randomUUID } from 'crypto';
import CreateAssignmentBody from '../Bodies/CreateAssignmentBody';
import CreateDBAssignment from '../Bodies/CreateDBAssignment';
import ICanvas from '../canvas/ICanvas';
import DB from '../Data/db';
import Assignment from '../models/Assignment';
import AssignmentWithTasks from '../models/AssignmentWithTask';
import Task from '../models/Task';
import IAssignmentLogic from './IAssignmentLogic';
import {
  isValidISODateString,
} from 'iso-datestring-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

class AssignmentLogic implements IAssignmentLogic {
  constructor(
    private readonly canvasService: ICanvas,
    private readonly dataBaseService: DB,
  ) {}

  async GetAssignment(id : string){
    let assignment = await this.dataBaseService.GetAssignment(id);
    if(assignment == null){
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
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

  async CreateAssignment(assignment: CreateAssignmentBody) {

    return await this.canvasService.CreateAssignment(assignment.courseID, assignment);
  }
}
export default AssignmentLogic;

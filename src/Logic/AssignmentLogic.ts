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

  /* async GetAssignment(id : string, courseId : number){
    let _assignment = await this.canvasService.GetAssignment(await (await this.dataBaseService.GetAssignment(id)).canvasId, courseId);
    let tasks = await this.dataBaseService.GetTasks(id);
    let _task : Task[];
    tasks.forEach(element => {
      _task.push(new Task(element.id, element.name, "description", element.updatedAt,element.updatedAt, element.updatedAt,element.status, element.assignmentID))
    })
    return new AssignmentWithTasks(_assignment, tasks);
 }*/

  async CreateAssignment(id: CreateAssignmentBody) {
    return 'test';
  }

  async GetAssignments(courseId: number) {
    const assignments = await this.canvasService.GetAssignments(courseId);
    // let _assignments: Assignment[];
    // assignments.forEach((element) => {
    //   _assignments.push(
    //     new Assignment(
    //       element.id,
    //       element.name,
    //       element.description,
    //       element.updated_at,
    //       element.created_at,
    //       element.due_at,
    //       element.course_id,
    //       null,
    //     ),
    //   );
    // });
    return assignments;
  }

  async CreateDBAssignment(canvasId: number, boardId: string, status: string) {
    const id = randomUUID();
    let assignments = await this.dataBaseService.GetAssignments(boardId);
    assignments = assignments.filter(
      (element) => element.canvasId === canvasId && element.boardId === boardId,
    );
    if (assignments.length === 0) {
      return await this.dataBaseService.CreateAssignment(
        id,
        boardId,
        canvasId,
        status,
      );
    }
    return;
  }
}
export default AssignmentLogic;

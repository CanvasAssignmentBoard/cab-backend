import CreateDBAssignment from 'src/Bodies/CreateDBAssignment';
import Assignment from 'src/models/Assignment';

interface IAssignmentLogic {
  //GetAssignment(id : string, courseId : number);
  GetAssignments(courseId: number): Promise<Assignment[]>;
  CreateDBAssignment(canvasId: number, boardId: string, status: string);
}
export default IAssignmentLogic;

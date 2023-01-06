import CreateAssignmentBody from 'src/Bodies/CreateAssignmentBody';
import CreateDBAssignment from 'src/Bodies/CreateDBAssignment';
import Assignment from 'src/models/Assignment';

interface IAssignmentLogic {
  GetAssignment(id : string);
  CreateAssignment(courseId: number, assignment: CreateAssignmentBody);
}
export default IAssignmentLogic;

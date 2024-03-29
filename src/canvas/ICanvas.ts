import CreateAssignmentBody from 'src/Bodies/CreateAssignmentBody';
import Assignment from 'src/models/Assignment';
import IAssignment from 'src/models/IAssignment';
import Course from 'src/models/ICourse';

interface ICanvas {
  GetCourses();
  GetAssignments(courseId: number): Promise<Assignment[]>;
  GetAssignment(id: number, courseId: number);
  GetCurrentUserID()
  CreateAssignment(courseId: number, assignment : CreateAssignmentBody);
}
export default ICanvas;

import Assignment from 'src/models/Assignment';
import IAssignment from 'src/models/IAssignment';
import Course from 'src/models/ICourse';

interface ICanvas {
  GetCourses();
  GetAssignments(courseId: number): Promise<Assignment[]>;
  GetAssignment(id: number, courseId: number);
  GetCurrentUserID()
}
export default ICanvas;

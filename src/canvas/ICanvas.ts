import IAssignment from "src/models/IAssignment";
import Course from "src/models/ICourse"

interface ICanvas{
    GetCourses();
    GetAssignments(courseId : number);
    GetAssignment(id : number, courseId : number);
}export default ICanvas;
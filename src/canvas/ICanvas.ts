import IAssignment from "src/models/IAssignment";
import Course from "src/models/ICourse"

interface ICanvas{
    GetCourses() : Course[];
    GetAssignments(courseId : number) : IAssignment[];
}export default ICanvas;
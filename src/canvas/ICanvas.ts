import IAssignment from "src/models/IAssignment";
import ICourse from "src/models/ICourse"

interface ICanvas{
    GetCourses() : ICourse[];
    GetAssignments(courseId : number) : IAssignment[];
}export default ICanvas;
import IAssignment from "src/models/IAssignment";
import ICourse from "src/models/ICourse"

interface ICanvas{
    GetCourses() : ICourse[];
    GetAssignments() : IAssignment[];
}export default ICanvas;
import IAssignment from "./IAssignment";
import Task from "./Task";

interface IAssignmentWithTasks extends IAssignment {
    tasks : any[];
} export default IAssignmentWithTasks;
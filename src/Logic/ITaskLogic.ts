import { CreateTaskBody } from "src/Bodies/CreateTaskBody"

interface ITaskLogic {
    GetTasks(id : string)
    
    CreateTask(task : CreateTaskBody)
} export default ITaskLogic;
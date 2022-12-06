import { CreateTaskBody } from "src/Bodies/CreateTaskBody"

interface ITaskLogic {
    GetTasks(id : string)
    Edit(task : CreateTaskBody)
    CreateTask(task : CreateTaskBody)
    Delete(id : string)
} export default ITaskLogic;
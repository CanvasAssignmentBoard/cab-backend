import ITask from "./ITask";

class Task implements ITask{
    id : string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    due_at: Date;
    status: string;
    parent_assignment_id: string;

    constructor(id: string, name: string, description: string, created_at: Date, updated_at: Date, due_at: Date, status: string, parent_assignment_id: string){
        this.name = name;
        this.id = id;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.due_at = due_at;
        this.status = status;
        this.parent_assignment_id = parent_assignment_id;
    }
} export default Task;
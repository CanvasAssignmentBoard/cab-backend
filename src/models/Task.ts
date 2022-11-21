import ITask from "./ITask";

class Task implements ITask {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  due_at: Date;
  status: string;
  parent_assignment_id: number;

  constructor(
    id: number,
    name: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    due_at: Date,
    status: string,
    parent_assignment_id: number,
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.due_at = due_at;
    this.status = status;
    this.parent_assignment_id = parent_assignment_id;
  }
}
export default Task;

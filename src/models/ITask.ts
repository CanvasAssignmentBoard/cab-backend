interface ITask{
    id : string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    due_at: Date;
    status: string;
    parent_assignment_id: string;
} export default ITask;
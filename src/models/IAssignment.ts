interface IAssignment{
    id : number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    due_at: Date;
    course_id: number;
    submission: number;
} export default IAssignment;
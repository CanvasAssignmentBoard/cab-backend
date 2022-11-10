interface IAssignment{
    id : number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    due_at: Date;
    course_id: number;
    submission: number;
}

class Assignment implements IAssignment{
    id : number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    due_at: Date;
    course_id: number;
    submission: number;

    constructor(id: number, name: string, description: string, created_at: Date, updated_at: Date, due_at: Date, course_id: number, submission: number){
        this.name = name;
        this.id = id;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.due_at = due_at;
        this.course_id = course_id;
        this.submission = submission;
    }
} export default Assignment;
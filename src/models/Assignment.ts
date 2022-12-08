import IAssignment from './IAssignment';

class Assignment implements IAssignment {
  id: string | number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  due_at: string;
  course_id: number;
  submission: number | null;

  constructor(
    id: string | number,
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
    due_at: string,
    course_id: number,
    submission: number | null,
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.due_at = due_at;
    this.course_id = course_id;
    this.submission = submission;
  }
}
export default Assignment;

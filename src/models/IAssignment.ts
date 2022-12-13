interface IAssignment {
  id: string | number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  due_at: string;
  course_id: number;
  submission: number | null;
  canvasID: number;
}
export default IAssignment;

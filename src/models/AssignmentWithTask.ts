import Assignment from './Assignment';
import IAssignmentWithTasks from './IAssignmentWithTasks';
import Task from './Task';

export default class AssignmentWithTasks implements IAssignmentWithTasks {
  id: number | string;
  canvasID : number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  due_at: string;
  course_id: number;
  submission: number;
  tasks: any[];

  constructor(assignment: Assignment, tasks: any[]) {
    this.name = assignment.name;
    this.id = assignment.id;
    this.description = assignment.description;
    this.created_at = assignment.created_at;
    this.updated_at = assignment.updated_at;
    this.due_at = assignment.due_at;
    this.course_id = assignment.course_id;
    this.submission = assignment.submission;
    this.tasks = tasks;
  }
}


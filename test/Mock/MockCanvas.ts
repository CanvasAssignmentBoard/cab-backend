import ICanvas from '../../src/canvas/ICanvas';
import ICourse from '../../src/models/ICourse';
import Course from '../../src/models/Course';
import IAssignment from '../../src/models/IAssignment';
import Assignment from '../../src/models/Assignment';

import { Injectable } from '@nestjs/common';
import CreateAssignmentBody from 'src/Bodies/CreateAssignmentBody';

@Injectable()
class MockCanvas implements ICanvas {

  async GetCourses(): Promise<ICourse[]> {
    const courses: Course[] = [];
    courses.push(new Course(123, 'CourseName'));
    return courses;
  }

  async GetAssignments(courseId: number): Promise<Assignment[]> {
    const assignments: Assignment[] = [];

    let i = 0;
    /*while (true) {
      if (data[i] == undefined) {
        break;
      }
      assignments.push(
        new Assignment(
          "null",
          data[i].name,
          data[i].description,
          data[i].created_at,
          data[i].updated_at,
          data[i].due_at,
          data[i].course_id,
          data[i].submission,
          data[i].id
        ),
      );
      i++;
    }*/
    return assignments;
  }

  async GetAssignment(id: number, courseId: number): Promise<Assignment> {
    return new Assignment(
      "",
      "data.name",
      "data.description",
      "data.created_at",
      "data.updated_at",
      "data.due_at",
      0,
      0,
      0
    );
  }

  async CreateAssignment(courseId: number, assignment : CreateAssignmentBody) {
    return true;
  }

  async GetCurrentUserID() {

    return 1;
  }

  constructor() {}
}
export default MockCanvas;

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
    for (let index = 0; index < 5; index++) {
      assignments.push(
        new Assignment(
          "",
          "AssignmentName",
          "AssignmentDescription",
          new Date().toISOString(),
          new Date().toISOString(),
          new Date().toISOString(),
          courseId,
          1,
          index
        ),
      );
    }
    return assignments;
  }

  async GetAssignment(id: number, courseId: number): Promise<Assignment> {
    return new Assignment(
      "",
      "AssignmentName",
      "AssignmentDescription",
      new Date().toISOString(),
      new Date().toISOString(),
      new Date().toISOString(),
      courseId,
      1,
      id
    );
  }

  async CreateAssignment(courseId: number, assignment : CreateAssignmentBody) {
    return true;
  }

  async GetCurrentUserID() {

    return 123;
  }

  constructor() {}
}
export default MockCanvas;

import ICanvas from './ICanvas';
import ICourse from '../models/ICourse';
import Course from '../models/Course';
import IAssignment from '../models/IAssignment';
import Assignment from '../models/Assignment';
import fetch from 'node-fetch';
import { ReqCourse, ReqAssignment,ReqUser } from './Types';
import { Injectable } from '@nestjs/common';

// Regular student: 'Bearer 22661~zjtSTQaieKkQJD6RGzYDooBLZIi3NbwH7jZgaFQTBw9xsnTuQ8PrwuzRLuFW6WwS'
// Teacher: 'Bearer 22661~4e7z2KYIGz1ZkUESyVmAfBfy1TexJetqFsZLy1Ep7t450sZhJ87t09PWFWuGe5uv'
// OL student: 'Bearer '

// openmaze Uri: https://openmaze.instructure.com/api/v1
// fhict Uri: https://fhict.instructure.com/api/v1
async function request<TResponse>(
  url: string,
  config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 22661~zjtSTQaieKkQJD6RGzYDooBLZIi3NbwH7jZgaFQTBw9xsnTuQ8PrwuzRLuFW6WwS',
    },
  },
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse[]);
}

@Injectable()
class Canvas implements ICanvas {
  host = 'https://openmaze.instructure.com/api/v1';
  async GetCourses(): Promise<ICourse[]> {
    const courses: Course[] = [];
    const data = await request<ReqCourse>(`${this.host}/courses`);
    let i = 0;
    while (true) {
      if (data[i] == undefined) {
        break;
      }
      courses.push(new Course(data[i].id, data[i].name));
      i++;
    }
    return courses;
  }

  async GetAssignments(courseId: number): Promise<Assignment[]> {
    const assignments: Assignment[] = [];
    const data = await request<ReqAssignment>(
      `${this.host}/courses/` + courseId + '/assignments',
    );

    let i = 0;
    while (true) {
      if (data[i] == undefined) {
        break;
      }
      assignments.push(
        new Assignment(
          data[i].id,
          data[i].name,
          data[i].description,
          data[i].created_at,
          data[i].updated_at,
          data[i].due_at,
          data[i].course_id,
          data[i].submission,
        ),
      );
      i++;
    }
    return assignments;
  }

  async GetAssignment(id: number, courseId: number): Promise<Assignment> {
    const data = await request<ReqAssignment>(
      `${this.host}/courses/` + courseId + '/assignments/' + id,
    );
    return new Assignment(
      data.id,
      data.name,
      data.description,
      data.created_at,
      data.updated_at,
      data.due_at,
      data.course_id,
      0,
    );
  }

  async CreateAssignment(courseId: number) {
    const data = await request<ReqAssignment>(
      `${this.host}/courses/` + courseId + '/assignments/',
    );
    return true;
  }

  async GetCurrentUserID() {
    const data = await request<ReqUser>(
      `${this.host}/user/self'`,
    );
    return data.id;
  }

  constructor() {}
}
export default Canvas;

import ICanvas from './ICanvas';
import ICourse from '../models/ICourse'
import Course from '../models/Course'
import IAssignment from "../models/IAssignment"
import Assignment from "../models/Assignment"
import fetch from "node-fetch";
import { ReqCourse, ReqAssignment } from './Types';
import { Injectable } from '@nestjs/common';

async function request<TResponse>(
  url: string,
  config: RequestInit = {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer 2464~7b2ZQvkRTirCkFVyiQ4T4KCrLZv4FKynkCCUINJzbgPydHnQ4krPzglEZCtZYrCe' }
  }
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse[]);
}

@Injectable()
class Canvas {

  async GetCourses(): Promise<ICourse[]> {
    let courses: Course[] = [];
    let data = await request<ReqCourse>('https://fhict.instructure.com/api/v1/courses');
    let i: number = 0;
    while (true) {
      if (data[i] == undefined) {
        break;
      }
      courses.push(new Course(data[i].id, data[i].name));
      i++;
    }
    return courses
  }

  async GetAssignments(courseId: number): Promise<Assignment[]> {
    let assignments: Assignment[] = [];
    let data = await request<ReqAssignment>('https://fhict.instructure.com/api/v1/courses/' + courseId + '/assignments')

    let i: number = 0;
    while (true) {
      if (data[i] == undefined) {
        break;
      }
      assignments.push(new Assignment(data[i].id, data[i].name, data[i].description, data[i].created_at, data[i].updated_at, data[i].due_at, data[i].course_id, data[i].submission));
      i++;
    }
    return assignments;
  }

  async GetAssignment(id : number, courseId : number): Promise<Assignment>{
    let data = await request<ReqAssignment>('https://fhict.instructure.com/api/v1/courses/' + courseId + '/assignments/' + id)
    return new Assignment(data.id, data.name, data.description, data.created_at, data.updated_at, data.due_at, data.course_id, 0)
  }

  constructor() {

  }
} export default Canvas;
import ICanvas from './ICanvas';
import ICourse from '../models/ICourse'
import Course from '../models/Course'
import IAssignment from "../models/IAssignment"
import Assignment from "../models/Assignment"
import Task from 'src/models/Task';
import fetch from "node-fetch";
import axios from 'axios';
import { test } from "./ICourseReq"
import { ReqCourse, ReqAssignment } from './Types';

function request<TResponse>(
  url: string,
  config: RequestInit = {
    headers:   {'Content-Type': 'application/json', 'Authorization': 'Bearer 2464~Pr6MNqoOpRcKLcYqjeoUpj11xTc8Fjj0v9Uo9X1cPhFKxOJ8k8yvBmRLUOzK5nF3'}
  }
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse[]);
}

class Canvas implements ICanvas {
    

    
    GetCourses() : ICourse[]{
      let courses : Course[] = [];
      request<ReqCourse>('https://fhict.instructure.com/api/v1/courses').then(course => {

        let i : number = 0;
        while(true){
          if(course[i] == undefined){
            break;
          }
          console.log(course[i].name);
          courses.push(new Course(course[i].id, course[i].name));
          i++;
        }
        return courses;
      });
      return courses;
        
    }
    
    GetAssignments(courseId : number) : IAssignment[]{
        let assignments : Assignment[] = [];
        request<ReqAssignment>('https://fhict.instructure.com/api/v1/courses/' + courseId + '/assignments').then(assignment => {

        let i : number = 0;
        while(true){
          if(assignment[i] == undefined){
            break;
          }
          
          assignments.push(new Assignment(assignment[i].id, assignment[i].name, assignment[i].description, assignment[i].created_at, assignment[i].updated_at, assignment[i].due_at, assignment[i].course_id, assignment[i].submission));
          console.log(assignments);
          i++;
        }
        return assignments;
      });
      return assignments;
    }


    constructor(){

    }
}export default Canvas;
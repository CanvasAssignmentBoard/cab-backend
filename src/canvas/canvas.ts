import ICanvas from './ICanvas';
import ICourse from '../models/ICourse'
import Course from '../models/Course'
import IAssignment from "../models/IAssignment"
import Assignment from "../models/Assignment"
import Task from 'src/models/Task';
import fetch from "node-fetch";
import axios from 'axios';
import { test } from "./ICourseReq"
function request<TResponse>(
    url: string,
    // `RequestInit` is a type for configuring 
    // a `fetch` request. By default, an empty object.
    config: RequestInit = {
        headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 2464~Pr6MNqoOpRcKLcYqjeoUpj11xTc8Fjj0v9Uo9X1cPhFKxOJ8k8yvBmRLUOzK5nF3'
        }
    }
     
  // This function is async, it will return a Promise:
  ): Promise<TResponse> {
      
    // Inside, we call the `fetch` function with 
    // a URL and config given:
    return fetch(url, config)
      // When got a response call a `json` method on it
      .then((response) => {
        console.log(response.json());
        response.json();
        //console.log(response);

    })
      // and return the result data.
      .then((data) => {

    });
      
      // We also can use some post-response
      // data-transformations in the last `then` clause.
  }

class Canvas implements ICanvas {
    

    
    GetCourses() : ICourse[]{
        
        fetch('https://fhict.instructure.com/api/v1/courses',{
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer 2464~Pr6MNqoOpRcKLcYqjeoUpj11xTc8Fjj0v9Uo9X1cPhFKxOJ8k8yvBmRLUOzK5nF3'
        }
        }).then(data => {
            let output = data.json();
            console.log(data)
        })
        
        let courses : Course[] = [];
        return courses;
    }
    GetAssignments() : IAssignment[]{
        let Assignment : Assignment[] = [];
        return Assignment;
    }
    constructor(){

    }
}export default Canvas;
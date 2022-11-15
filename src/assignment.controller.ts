import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import { IdBody } from './IdBody';
@Controller("Assignment")
export class AssignmentController {
  constructor(private readonly canvasService: Canvas) {}

  @Get()
  async getAllAssignmentsForCourses(@Body() body: IdBody){
    let assignments: Assignment[] = []
    for (let i = 0; i < body.id.length; i++) {
    {
      assignments = assignments.concat(await this.canvasService.GetAssignments(body.id[i]));
      console.log(assignments)
    }
    return assignments;
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
@Controller()
export class AssignmentController {
  constructor(private readonly appService: AppService) {}

  @Get("GetAll")
  getAllAssignmentsForCourses(): Assignment[]{
    let assignments: Assignment[] = [
      new Assignment(1,"AssignmentName1","Description1",new Date(), new Date(), new Date(), 1, 1),
      new Assignment(2,"AssignmentName2","Description2",new Date(), new Date(), new Date(), 2, 2),
      new Assignment(3,"AssignmentName3","Description3",new Date(), new Date(), new Date(), 3, 3),
    ];

    return assignments;
  }

  @Get()
  getAllAssignmentsById(): Assignment[]{
    let assignments: Assignment[] = [
      new Assignment(1,"AssignmentName1","Description1",new Date(), new Date(), new Date(), 1, 1),
      new Assignment(2,"AssignmentName2","Description2",new Date(), new Date(), new Date(), 2, 2),
      new Assignment(3,"AssignmentName3","Description3",new Date(), new Date(), new Date(), 3, 3),
    ];

    return assignments;
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment';
import Task from './models/Task';
import Course from './models/Course';
import Board from './models/Board';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAllAssignmentsForCourses')
  getAllAssignmentsForCourses(): Assignment[] {
    const assignments: Assignment[] = [
      new Assignment(
        1,
        'AssignmentName1',
        'Description1',
        new Date(),
        new Date(),
        new Date(),
        1,
        1,
      ),
      new Assignment(
        2,
        'AssignmentName2',
        'Description2',
        new Date(),
        new Date(),
        new Date(),
        2,
        2,
      ),
      new Assignment(
        3,
        'AssignmentName3',
        'Description3',
        new Date(),
        new Date(),
        new Date(),
        3,
        3,
      ),
    ];

    return assignments;
  }

  @Get('getAllTasksForAssignment')
  getAllTasksForAssignment(): Task[] {
    const tasks: Task[] = [
      new Task(
        1,
        'TaskName1',
        'Description1',
        new Date(),
        new Date(),
        new Date(),
        'status',
        1,
      ),
      new Task(
        2,
        'TaskName1',
        'Description1',
        new Date(),
        new Date(),
        new Date(),
        'status',
        1,
      ),
      new Task(
        3,
        'TaskName1',
        'Description1',
        new Date(),
        new Date(),
        new Date(),
        'status',
        1,
      ),
    ];

    return tasks;
  }
}

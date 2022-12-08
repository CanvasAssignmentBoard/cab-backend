import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import Assignment from './models/Assignment';
import Task from './models/Task';
import Canvas from './canvas/canvas';
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import ITaskLogic from './Logic/ITaskLogic';
import { TaskLogic } from './Logic/TaskLogic';
import DB from './Data/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateAssignmentBody from './Bodies/CreateAssignmentBody';
import IAssignmentLogic from './Logic/IAssignmentLogic';
import AssignmentLogic from './Logic/AssignmentLogic';

@ApiTags('Assignment')
@Controller('Assignment')
export class AssignmentController {
  assignmentLogic: IAssignmentLogic;
  constructor(canvasService: Canvas, dataBaseService: DB) {
    this.assignmentLogic = new AssignmentLogic(canvasService, dataBaseService);
  }

  @ApiOperation({ summary: 'Get all assignments' })
  @Get(':courseId')
  async getAllAssignmentsForCourse(@Param() params) {
    console.log(params.courseId);
    return await this.assignmentLogic.GetAssignments(params.courseId);
  }
  /*@ApiOperation({ summary :"Get assignment"})
  @Get("")
  async getAllTasksForAssignment(@Body() id : string){
    return await this.taskLogic.GetTasks(id);
  }
  @ApiOperation({ summary :"Create assignment in course"})
  @Post("Create")
  async CreateAssignment(@Body() body : CreateAssignmentBody){
    return await this.taskLogic.GetTasks(id);
  }*/
}

import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import Assignment from './models/Assignment';
import Task from './models/Task';
import Canvas from './canvas/canvas';
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import DB from './Data/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateAssignmentBody from './Bodies/CreateAssignmentBody';
import IAssignmentLogic from './Logic/IAssignmentLogic';
import AssignmentLogic from './Logic/AssignmentLogic';
import { PrismaClient } from '@prisma/client';

@ApiTags('Assignment')
@Controller('Assignment')
export class AssignmentController {
  assignmentLogic: IAssignmentLogic;
  constructor(canvasService: Canvas, dataBaseService: DB) {
    this.assignmentLogic = new AssignmentLogic(canvasService, dataBaseService);
  }

  @ApiOperation({ summary :"Get assignment"})
  @Get(":id")
  async getAllTasksForAssignment(@Param() params){
    console.log(params)
    return await this.assignmentLogic.GetAssignment(params.id.toString());
  }

  @ApiOperation({ summary :"Create assignment in course"})
  @Post("Create")
  async CreateAssignment(@Body() body : CreateAssignmentBody){
    return await this.assignmentLogic.CreateAssignment(body);
  }
}

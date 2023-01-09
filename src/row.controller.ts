import {
  Controller,
  Body,
  Post,
  Param,
} from '@nestjs/common';
import Assignment from './models/Assignment';
import Task from './models/Task';
import Canvas from './canvas/canvas';
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import { randomUUID } from 'crypto';
import DB from './Data/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import IRowLogic from './Logic/IRowLogic';
import { RowLogic } from './Logic/RowLogic';

@ApiTags('Task')
@Controller('Task')
export class RowController {
  rowLogic: IRowLogic;
  constructor(canvasService: Canvas, dataBaseService: DB) {
    this.rowLogic = new RowLogic(dataBaseService);
  }

  @ApiOperation({ summary :"Create assignment in course"})
  @Post(":assignmentid/:rowid")
  async getBoardById(@Param() params){
    return await this.rowLogic.MoveToRow(params.assignmentid, params.rowid);
  }
}

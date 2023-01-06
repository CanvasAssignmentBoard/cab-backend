import {
  Controller,
  Body,
  Post,
} from '@nestjs/common';
import Assignment from './models/Assignment';
import Task from './models/Task';
import Canvas from './canvas/canvas';
import { CreateTaskBody } from './Bodies/CreateTaskBody';
import { randomUUID } from 'crypto';
import DB from './Data/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('Task')
export class RowController {
  
}

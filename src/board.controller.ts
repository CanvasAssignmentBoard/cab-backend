import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import { CreateBoard, CreateAssignment, GetAllBoard, GetAssignments } from './Data/db';
import { BoardCreateBody } from './Bodies/BoardCreateBody';
import { randomUUID } from 'crypto';
@Controller("Board")
export class BoardController {
  constructor(private readonly canvasService: Canvas) {}

  @Get("Create")
  async createBoard(@Body() body: BoardCreateBody){
    let boardID = randomUUID();
    await CreateBoard(body.name, boardID , "owner");
    for (let course of body.courses){
      let assignments = await this.canvasService.GetAssignments(course);
      for(let assignment of assignments){
        await CreateAssignment(randomUUID(), boardID, assignment.id);
      }      
    }
    return;
  }

  @Get()
  async getBoardById(@Body() boardID: string){
    await this.canvasService.GetAssignments(await GetAssignments(boardID));
  }

  @Get("All")
  async getAllBoards(){
    return await GetAllBoard("owner");;
  }
}

import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Assignment from './models/Assignment'
import Task from './models/Task';
import Canvas from './canvas/canvas'
import { CreateBoard, CreateAssignment, GetAllBoard, GetAssignments, GetCoursesOfBoard, LinkBoardToCourse } from './Data/db';
import { BoardCreateBody } from './Bodies/BoardCreateBody';
import { randomUUID } from 'crypto';
import Board from './models/Board';
@Controller("Board")
export class BoardController {
  constructor(private readonly canvasService: Canvas) {}

  @Get("Create")
  async createBoard(@Body() body: BoardCreateBody){
    let board : Board = new Board();
    let boardID = randomUUID();
    await CreateBoard(body.name, boardID , "owner");
    
    board.name = body.name;
    board.id = boardID;
    for (let course of body.courses){
      await LinkBoardToCourse(board.id, course); //
      let assignments = await this.canvasService.GetAssignments(course);
      for(let assignment of assignments){
        board.assignments.push(assignment);
        await CreateAssignment(randomUUID(), boardID, assignment.id);
      }      
    }
    return board;
  }

  @Get()
  async getBoardById(@Body() boardID: string){
    let assignments : Assignment[] = [];
    for(let D of await GetCoursesOfBoard(boardID)){
      for(let Y of await GetAssignments(boardID)){
        assignments.push(await this.canvasService.GetAssignment(Y.canvasId, ));
      }
    }
    

    return await this.canvasService.GetAssignments();
  }

  @Get("All")
  async getAllBoards(){
    return await GetAllBoard("owner");;
  }
}

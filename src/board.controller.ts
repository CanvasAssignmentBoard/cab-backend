import {Controller, Get, Body, Post, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import Canvas from './canvas/canvas'
import { BoardCreateBody } from './Bodies/BoardCreateBody';
import { BoardLogic } from './Logic/boardLogic';
import IBoardLogic from './Logic/IBoardLogic';
import DB from './Data/db';

@Controller("Board")
export class BoardController {
  boardLogic : IBoardLogic;
  constructor(canvasService: Canvas, dataBaseService : DB) {
    this.boardLogic = new BoardLogic(canvasService, dataBaseService);
  }

  @Get("Create")
  async createBoard(@Body() body: BoardCreateBody){
    return await this.boardLogic.CreateBoard(body)
  }

  @Post()
  async getBoardById(@Req() req, @Res() res){
    return res.json(await this.boardLogic.getBoardById(req.body.boardID));
  }

  @Get("All")
  async getAllBoards(){
    return await this.boardLogic.getAllBoards();
  }
}

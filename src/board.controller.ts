import {Controller, Get, Body, Post, Req, Res} from '@nestjs/common';
import Canvas from './canvas/canvas'
import { BoardCreateBody } from './Bodies/BoardCreateBody';
import { BoardLogic } from './Logic/boardLogic';
import IBoardLogic from './Logic/IBoardLogic';
import DB from './Data/db';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Board')
@Controller("Board")
export class BoardController {
  boardLogic : IBoardLogic;
  constructor(canvasService: Canvas, dataBaseService : DB) {
    this.boardLogic = new BoardLogic(canvasService, dataBaseService);
  }

  @ApiBody({ type: BoardCreateBody })
  @ApiOperation({ summary :"Create a board"})
  @Post("Create")
  async createBoard(@Body() body: BoardCreateBody){
    return await this.boardLogic.CreateBoard(body)
  }

  @ApiBody({type: String})
  @ApiOperation({ summary :"Get a board using the id"})
  @Post()
  async getBoardById(@Req() req, @Res() res){
    return res.json(await this.boardLogic.getBoardById(req.body.boardID));
  }

  @ApiOperation({ summary :"Get all boards"})
  @Get("All")
  async getAllBoards(){
    return await this.boardLogic.getAllBoards();
  }
}

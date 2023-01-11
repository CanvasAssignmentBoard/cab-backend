import { Controller, Get, Body, Post, Req, Res, Param } from '@nestjs/common';
import Canvas from './canvas/canvas';
import { BoardCreateBody } from './Bodies/BoardCreateBody';
import { BoardLogic } from './Logic/boardLogic';
import IBoardLogic from './Logic/IBoardLogic';
import IAssignmentLogic from './Logic/IAssignmentLogic';
import DB from './Data/db';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Board')
@Controller('Board')
export class BoardController {
  boardLogic: IBoardLogic;
  constructor(canvasService: Canvas, dataBaseService: DB) {
    this.boardLogic = new BoardLogic(canvasService, dataBaseService);
  }

  @ApiBody({ type: BoardCreateBody })
  @ApiOperation({ summary: 'Create a board' })
  @Post('Create')
  async createBoard(@Body() body: BoardCreateBody) {
    console.log(body)
    await this.boardLogic.CreateBoard(body);
    return 
  }

  @ApiBody({ type: String })
  @ApiOperation({ summary: 'Get a board using the id' })
  @Get(':id')
  async getBoardById(@Param() params) {
    return await this.boardLogic.getBoardById(params.id.toString());
  }

  @ApiOperation({ summary: 'Get all boards' })
  @Get('')
  async getAllBoards() {
    return await this.boardLogic.getAllBoards();
  }
}

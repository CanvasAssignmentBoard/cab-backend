import { randomUUID } from 'crypto';
import DB from 'src/Data/db';
import { BoardCreateBody } from '../Bodies/BoardCreateBody';
import Board from '../models/Board';
import Assignment from '../models/Assignment';
import Canvas from 'src/canvas/canvas';
import IBoardLogic from './IBoardLogic';
import AssignmentLogic from './AssignmentLogic';
import { timer } from 'rxjs';
import CreateDBAssignment from '../Bodies/CreateDBAssignment';

export class BoardLogic implements IBoardLogic {
  private readonly assignmentLogic: AssignmentLogic;
  constructor(
    private readonly canvasService: Canvas,
    private readonly dataBaseService: DB,
  ) {
    this.assignmentLogic = new AssignmentLogic(
      this.canvasService,
      this.dataBaseService,
    );
  }

  async CreateBoard(body: BoardCreateBody) {
    const board: Board = new Board();
    board.assignments = [];
    const boardID = randomUUID();
    await this.dataBaseService.CreateBoard(
      body.name,
      boardID,
      await this.canvasService.GetCurrentUserID(),
      'board',
    );

    board.name = body.name;
    board.id = boardID;
    for (const course of body.courses) {
      const assignments = await this.canvasService.GetAssignments(course);
      for (const assignment of assignments) {
        board.assignments.push(assignment);
        await this.dataBaseService.CreateAssignment(
          randomUUID(),
          boardID,
          assignment.canvasID,
          course,
          'TODO',
        );
      }
    }
    return board;
  }

  async getBoardById(boardID: string) {
    const board = await this.dataBaseService.GetBoard(boardID);
    let courses : number[] = [];

    board.assignments.forEach(assignment => {
      
    })
    return await this.dataBaseService.GetBoard(boardID);
  }

  async getAllBoards() {
    return await this.dataBaseService.GetAllBoard(await this.canvasService.GetCurrentUserID());
  }
}

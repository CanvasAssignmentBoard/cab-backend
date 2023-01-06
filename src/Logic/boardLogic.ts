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
      Date.now().toString()
    );

    let columnID : string = randomUUID();
    for (let i = 0; i < body.rows.length; i++) {
      
      if(i == 0){
        await this.dataBaseService.CreateRow(columnID, true, body.rows[i], boardID)
      }
      await this.dataBaseService.CreateRow(randomUUID(), false, body.rows[i], boardID)
    }

    board.name = body.name;
    board.id = boardID;
    for (const course of body.courses) {
      const assignments = await this.canvasService.GetAssignments(course);
      for (const assignment of assignments) {
        board.assignments.push(assignment);
        await this.dataBaseService.CreateAssignment(
          randomUUID(),
          columnID,
          assignment.canvasID,
          course,
        );
      }
    }
    return board;
  }

  async getBoardById(boardID: string) {
    const board = await this.dataBaseService.GetBoard(boardID);
    let courses : number[] = [];

    board.rows.forEach(row => {
      row.assignments.forEach(item => {
        if(!courses.find(x => x == item.courseID)){
          courses.push(item.courseID);
        }
      })
    })

    return await this.dataBaseService.GetBoard(boardID);
  }

  async getAllBoards() {
    return await this.dataBaseService.GetAllBoard(await this.canvasService.GetCurrentUserID());
  }
}

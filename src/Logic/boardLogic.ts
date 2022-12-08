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
      'owner',
      'board',
    );

    board.name = body.name;
    board.id = boardID;
    for (const course of body.courses) {
      await this.dataBaseService.LinkBoardToCourse(board.id, course); //
      const assignments = await this.canvasService.GetAssignments(course);
      for (const assignment of assignments) {
        board.assignments.push(assignment);
        await this.dataBaseService.CreateAssignment(
          randomUUID(),
          boardID,
          assignment.id as number,
          'TODO',
        );
      }
    }
    return board;
  }

  async getBoardById(boardID: string) {
    const board: Board = new Board();

    const dbboard = await this.dataBaseService.GetBoard(boardID);
    board.id = dbboard.id;
    board.name = dbboard.name;
    board.assignments = [];

    const courses = await this.dataBaseService.GetCourses(boardID);
    for (const course of courses) {
      const assignments = await this.canvasService.GetAssignments(
        course.canvasId,
      );
      for (const assignment of assignments) {
        const dbAssignment = await this.dataBaseService.GetAssignmentByCanvas(
          assignment.id as number,
          boardID,
        );

        if (dbAssignment === null) {
          assignment.status = 'TODO';
          const new_assignment = await this.assignmentLogic.CreateDBAssignment(
            assignment.id as number,
            boardID,
            'TODO',
          );
          assignment.id = new_assignment.id;
        } else {
          assignment.status = dbAssignment.status;
          assignment.id = dbAssignment.id;
        }
        board.assignments.push(assignment);
      }
    }
    return board;
  }

  async getAllBoards() {
    return await this.dataBaseService.GetAllBoard('owner');
  }
}

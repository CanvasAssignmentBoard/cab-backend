import { randomUUID } from 'crypto';
import DB from '../Data/db';
import { BoardCreateBody } from '../Bodies/BoardCreateBody';
import Board from '../models/Board';
import Canvas from '../canvas/canvas';
import IBoardLogic from './IBoardLogic';
import AssignmentLogic from './AssignmentLogic';
import CreateDBAssignment from '../Bodies/CreateDBAssignment';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { error } from 'console';
import ICanvas from 'src/canvas/ICanvas';
import IDB from 'src/Data/IDB';

export class BoardLogic implements IBoardLogic {
  private readonly assignmentLogic: AssignmentLogic;
  constructor(
    private readonly canvasService: ICanvas,
    private readonly dataBaseService: IDB,
  ) {}

  async CreateBoard(body: BoardCreateBody) {
    if (body.name == null) {
      throw new HttpException('Missing board name', HttpStatus.BAD_REQUEST);
    }

    if (body.courses.length < 1) {
      throw new HttpException('Missing courses', HttpStatus.BAD_REQUEST);
    }

    if (body.rows.length < 1) {
      throw new HttpException('Missing rows', HttpStatus.BAD_REQUEST);
    }

    const board: Board = new Board();
    board.assignments = [];
    const boardID = randomUUID();
    await this.dataBaseService.CreateBoard(
      body.name,
      boardID,
      await this.canvasService.GetCurrentUserID(),
      'board',
      Date.now().toString(),
    );

    const columnID: string = randomUUID();
    for (let i = 0; i < body.rows.length; i++) {
      if (i == 0) {
        await this.dataBaseService.CreateRow(
          columnID,
          true,
          body.rows[i],
          boardID,
        );
      }
      await this.dataBaseService.CreateRow(
        randomUUID(),
        false,
        body.rows[i],
        boardID,
      );
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
          assignment.name,
        );
      }
    }
    return board;
  }

  async getBoardById(boardID: string) {
    /*board.rows.forEach(row => {
      row.assignments.forEach(item => {
        if(!courses.find(x => x == item.courseID)){
          courses.push(item.courseID);
        }
      })
    })*/

    if (boardID == undefined) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const board = await this.dataBaseService.GetBoard(boardID);

    // const assignments =
    //   board.rows.assignments == undefined ? [] : board.rows.assignments;
    const assignmentUpdate = new Promise<void>(async (res, rej) => {
      await board.rows.forEach(async (row, i) => {
        const assignments = [];
        const assignmentLoop = new Promise<void>(async (resolve, reject) => {
          if (row.assignments.length == 0) resolve();
          row.assignments.forEach(async (a, i, array) => {
            const ac = await this.canvasService.GetAssignment(
              a.canvasId,
              a.courseID,
            );
            a.name = ac.name;
            a.description = ac.description ?? '';

            // console.log(a)
            assignments.push(a);
            // console.log(assignments);
            if (i === array.length - 1) resolve();
          });
        });

        await assignmentLoop;
        board.rows[i].assignments = assignments;
      });
      res();
    });
    await assignmentUpdate;

    if (board == null) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    return board;
  }

  async getAllBoards() {
    return await this.dataBaseService.GetAllBoard(
      await this.canvasService.GetCurrentUserID(),
    );
  }
}

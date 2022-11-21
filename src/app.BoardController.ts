/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import Board from './models/Board';
import Course from './models/Course';
import Assignment from './models/Assignment';

@Controller('/board/:studentId')
export class BoardController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllBoardsForStudent(@Param('studentId') studentId: number): Board[] {
    const boards: Board[] = [
        new Board(1, 'BoardName1', [
                new Course(1, 'CourseName1'),
                new Course(2, 'CourseName2'),
                new Course(3, 'CourseName3'),
            ],
            [
                new Assignment(1, 'AssignmentName1', 'Description1', new Date(), new Date(), new Date(), 1, 1),
                new Assignment(2, 'AssignmentName2', 'Description2', new Date(), new Date(), new Date(), 2, 2),
                new Assignment(3, 'AssignmentName3', 'Description3', new Date(), new Date(), new Date(), 3, 3),
            ]
        ),
        new Board(2, 'BoardName2', [
                new Course(1, 'CourseName1'),
                new Course(2, 'CourseName2'),
            ],
            [
                new Assignment(1, 'AssignmentName1', 'Description1', new Date(), new Date(), new Date(), 1, 1),
                new Assignment(2, 'AssignmentName2', 'Description2', new Date(), new Date(), new Date(), 2, 2),
            ]
        ),
    ];

    return boards;
  }

    @Get('/:boardId')
    getBoardForStudent(@Param('studentId') studentId: number, @Param('boardId') boardId: number): Board {
        return new Board(1, 'BoardName1', [
                new Course(1, 'CourseName1'),
                new Course(2, 'CourseName2'),
                new Course(3, 'CourseName3'),
            ],
            [
                new Assignment(1, 'AssignmentName1', 'Description1', new Date(), new Date(), new Date(), 1, 1),
                new Assignment(2, 'AssignmentName2', 'Description2', new Date(), new Date(), new Date(), 2, 2),
                new Assignment(3, 'AssignmentName3', 'Description3', new Date(), new Date(), new Date(), 3, 3),
            ]
        );
    }
}

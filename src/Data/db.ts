import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import Prisma from './Prisma';

@Injectable()
class DB {
  constructor(private prisma: Prisma) {}

  /* Creates board using the following params
   ** @param {string}
   */
  async CreateBoard(
    _name: string,
    _id: string,
    _owner: string,
    _description: string,
  ) {
    await this.prisma.board.create({
      data: {
        name: _name,
        id: _id,
        owner: _owner,
        description: _description,
      },
    });
  }

  async GetCoursesOfBoard(_boardID: string) {
    return await this.prisma.assignment.findMany({
      where: {
        boardId: {
          equals: _boardID,
        },
      },
    });
  }

  async CreateAssignment(
    _id: string,
    _boardID: string,
    _canvasId: number,
    _status: string,
  ) {
    return await this.prisma.assignment.create({
      data: {
        id: _id,
        canvasId: _canvasId,
        boardId: _boardID,
        status: _status,
      },
    });
  }

  async LinkBoardToCourse(_boardID: string, _course: number) {
    return await this.prisma.course.create({
      data: {
        boardId: _boardID,
        canvasId: _course,
      },
    });
  }

  async GetAssignments(_boardID: string) {
    return await this.prisma.assignment.findMany({
      where: {
        boardId: {
          equals: _boardID,
        },
      },
    });
  }

  async GetAssignment(_id: string) {
    return await this.prisma.assignment.findUnique({
      where: {
        id: _id,
      },
    });
  }

  async GetAssignmentByCanvas(_canvasId: number, _boardId: string) {
    return await this.prisma.assignment.findFirst({
      where: {
        canvasId: _canvasId,
        boardId: _boardId,
      },
    });
  }

  async CreateTasks(
    _Id: string,
    _AssignmentId: string,
    _Status: string,
    _Name: string,
    _dueDate: string,
  ) {
    return await this.prisma.tasks.create({
      data: {
        id: _Id,
        status: _Status,
        name: _Name,
        assignmentID: _AssignmentId,
        dueAt: _dueDate,
      },
    });
  }

  async EditTask(
    _Id: string,
    _AssignmentId: string,
    Status: string,
    Name: string,
    _dueDate: string,
  ) {
    await this.prisma.tasks.update({
      where: {
        id: _Id,
      },
      data: {
        assignmentID: _AssignmentId,
        status: Status,
        name: Name,
        dueAt: _dueDate,
      },
    });
  }

  async DeleteTask(_Id: string) {
    return await this.prisma.tasks.delete({
      where: {
        id: _Id,
      },
    });
  }

  async GetTasks(Id: string) {
    return await this.prisma.tasks.findMany({
      where: {
        assignmentID: {
          equals: Id,
        },
      },
    });
  }

  async GetAllBoard(_owner: string) {
    return await this.prisma.board.findMany({
      where: {
        owner: {
          equals: _owner,
        },
      },
    });
  }

  async GetBoard(_id: string) {
    return await this.prisma.board.findUnique({
      where: {
        id: _id,
      },
    });
  }

  async GetCourses(_BoardID: string) {
    return await this.prisma.course.findMany({
      where: {
        boardId: {
          equals: _BoardID,
        },
      },
    });
  }
}
export default DB;

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { create } from 'domain';
import Assignment from 'src/models/Assignment';
import Prisma from './Prisma';

@Injectable()
class DB {
  constructor(private prisma: Prisma) {}

  
  async CreateBoard(
    _name: string,
    _id: string,
    _owner: number,
    _description: string,) {

    await this.prisma.board.create({
      data: {
        name: _name,
        id: _id,
        owner: _owner,
        description: _description,
      }
    });
  }

  async CreateAssignment(
    _id: string,
    _boardID: string,
    _canvasId: number,
    _courseId: number,
    _status: string,
  ) {
    return await this.prisma.board.update({
      where:{
        id: _boardID
      },
      data:{
        assignments:{
          create:{
            status: _status,
            canvasId: _canvasId,
            courseID: _courseId,
            id: _id
          }
        }
      }
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
      include:{
        tasks: true
      }
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
    return await this.prisma.assignment.update({
      where:{
        id: _AssignmentId
      },
      data: {
        tasks:{
          create:{
            id: _Id,
            status: _Status,
            name: _Name,
            dueAt: _dueDate,
          }
        }
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

  async GetAllBoard(_owner: number) {
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
      include:{
        assignments: true,
      }
    });
  }
}
export default DB;

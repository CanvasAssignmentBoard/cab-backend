import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { create } from 'domain';
import Assignment from 'src/models/Assignment';
import Prisma from './Prisma';

import IDB from './IDB';
@Injectable()
class DB implements IDB {
  constructor(private prisma: Prisma) {}

  async CreateBoard(
    _name: string,
    _id: string,
    _owner: number,
    _description: string,
    _lastUpdate: string,
  ) {
    await this.prisma.board.create({
      data: {
        name: _name,
        id: _id,
        owner: _owner,
        description: _description,
        lastUpdate: _lastUpdate,
      },
    });
  }

  async UpdateLastBoardUpdate(_id: string, _lastUpdate: string) {
    await this.prisma.board.update({
      where: {
        id: _id,
      },
      data: {
        lastUpdate: _lastUpdate,
      },
    });
  }

  async CreateAssignment(
    _id: string,
    _rowID: string,
    _canvasId: number,
    _courseId: number,
    _name: string
  ) {
    console.log(_name);
    return await this.prisma.row.update({
      where: {
        id: _rowID,
      },
      data: {
        assignments: {
          create: {
            name: _name,
            canvasId: _canvasId,
            courseID: _courseId,
            id: _id,
            index: await this.GenerateNewIndex(_rowID),
          },
        },
      },
    });
  }

  async GetDefaultRow() {
    return await this.prisma.row.findFirst({
      where: {
        default: true,
      },
    });
  }

  async GetAssignment(_id: string) {
    return await this.prisma.assignment.findUnique({
      where: {
        id: _id,
      },
      include: {
        tasks: true,
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
      where: {
        id: _AssignmentId,
      },
      data: {
        tasks: {
          create: {
            id: _Id,
            status: _Status,
            name: _Name,
            dueAt: _dueDate,
          },
        },
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

  async DoesAssignmenthaveTask(Id: string) {
    return await this.prisma.tasks.count({
      where: {
        assignmentID: Id,
      },
    });
  }

  async DoesTaskExist(Id: string) {
    return await this.prisma.tasks.count({
      where: {
        id: Id,
      },
    });
  }

  async DoesAssignmentExist(Id: string) {
    return await this.prisma.assignment.count({
      where: {
        id: Id,
      },
    });
  }

  async DoesRowExist(Id: string) {
    return await this.prisma.row.count({
      where: {
        id: Id,
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
      include: {
        rows: {
          include: {
            assignments: true,
          },
        },
      },
    });
  }

  async CreateRow(
    _id: string,
    _defaultRow: boolean,
    _name: string,
    _boardID: string,
  ) {
    return await this.prisma.board.update({
      where: {
        id: _boardID,
      },
      data: {
        rows: {
          create: {
            id: _id,
            default: _defaultRow,
            name: _name,
          },
        },
      },
    });
  }

  async RemoveRowConnection(_rowID: string, _assignmentId: string) {
    await this.prisma.row.update({
      where: {
        id: _rowID,
      },
      data: {
        assignments: {
          disconnect: [{ id: _assignmentId }],
        },
      },
    });
  }

  async AddRowConnection(_rowID: string, _assignmentId: string) {
    await this.prisma.row.update({
      where: {
        id: _rowID,
      },
      data: {
        assignments: {
          connect: [{ id: _assignmentId }],
        },
      },
    });
  }

  async GenerateNewIndex(_rowID: string = null) {
    if (_rowID == null) {
      const row = await this.prisma.row.findFirst({
        where: {
          default: true,
        },
      });
      return await this.prisma.assignment.count({
        where: {
          rowId: row.id,
        },
      });
    } else {
      return await this.prisma.assignment.count({
        where: {
          rowId: _rowID,
        },
      });
    }
  }

  async ReorderItem(_assignmentId: string, _index: number) {
    console.log("Reindexing")
    await this.prisma.assignment.update({
      where: {
        id: _assignmentId,
      },
      data: {
        index: parseInt(_index.toString()),
      },
    });
  }
}
export default DB;

import { PrismaClient } from '@prisma/client'
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { create } from 'domain';
import Assignment from 'src/models/Assignment';
import Prisma from 'src/Data/Prisma';
import { IsUUID } from 'class-validator';



class MockPrisma {
  constructor(private prisma: Prisma) {
  }
  
  async CreateBoard(id : string) {
    await this.prisma.board.create({
      data: {
        name: "Test Board",
        id: id,
        owner: 123,
        description: "Test description",
        lastUpdate: new Date().toISOString()
      }
    });
  }

  async CreateAssignment(_rowID: string) {
    return await this.prisma.row.update({
      where:{
        id: _rowID
      },
      data:{
        assignments:{
          create:{
            canvasId: 123,
            courseID: 123,
            id: "AssignmentId"
          }
        }
      }
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
        id: "AssignmentId",
      },
      data: {
        tasks:{
          create:{
            id: "TestID",
            status: "TestStatus",
            name: "TestName",
            dueAt: new Date().toISOString(),
          }
        }
      },
    });
  }

  async CreateRow(_id: string, _defaultRow: boolean){
    return await this.prisma.board.update({
      where:{ 
        id: "BoardID"
      },
      data:{ rows:{
        create:{
          id: _id,
          default: _defaultRow,
          name: "RowName"
        }
      }}
    })
  }

  async AddRowConnection(_rowID: string, _assignmentId: string){
    await this.prisma.row.update({
      where:{
        id: _rowID
      },
      data:{ 
        assignments:{
          connect: [{id: _assignmentId}]
        }
      }
    })
  }
  async WipeDB(){
    await this.prisma.tasks.deleteMany({});
    await this.prisma.assignment.deleteMany({});
    await this.prisma.row.deleteMany({});
    await this.prisma.board.deleteMany({});
  }
}
export default MockPrisma;

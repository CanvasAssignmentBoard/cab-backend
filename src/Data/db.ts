import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import Prisma from './Prisma';

class DB {
  constructor(private prisma: Prisma) {}

  /* Creates board using the following params
  ** @param {string}
  */
  async CreateBoard(_name: string, _id : string, _owner : string, _description : string){
    await this.prisma.board.create({
      data: {
        name: _name,
        id: _id,
        owner: _owner,
        description: _description
      }
    })
  }

  async GetCoursesOfBoard(_boardID : string){
    return await this.prisma.assignment.findMany({
      where:{
        boardId: {
          equals: _boardID
        }
      }
    })
  }

  async CreateAssignment(_id : string, _boardID : string, _canvasId: number){
    await this.prisma.assignment.create({
      data: {
        id: _id,
        canvasId: _canvasId,
        boardId: _boardID,
        status: "To Do"
      }
    })
  }

  async LinkBoardToCourse(_boardID : string, _course : number){
    return await this.prisma.course.create({
      data: {
        boardId: _boardID,
        canvasId: _course
      }
    })
  }

  async GetAssignments(_boardID : string){
    return await this.prisma.assignment.findMany( {
      where:{
        boardId: {
          equals: _boardID
        }
      }
    })
  }

  async CreateTasks(Id : string, AssignmentId : string, Status : string, Name : string){
    this.prisma.tasks.create({
     data:{
      id: Id,
      status: Status,
      name: Name,
      assignmentID: AssignmentId,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString()
     }
    })
  }
  async EditTask(Id : string, Status : string, Name : string){
    this.prisma.tasks.update({
      where: {
        id: Id
      }, data: {
        status: Status,
        name: Name,
      },
    })
  }

  async GetTasks(Id : string){
    return await this.prisma.tasks.findMany({
      where:{
        assignmentID: {
          equals: Id
        }
      }
    })
  }

  async GetAllBoard(_owner : string){
    return await this.prisma.board.findMany({
      where:{
        owner: {
          equals: _owner
        }
      }
    })
  }

  async GetCourses(_BoardID : string) {
    return await this.prisma.course.findMany({
      where:{
        boardId:{
          equals: _BoardID
        }
      }
    })
  }
} export default DB;

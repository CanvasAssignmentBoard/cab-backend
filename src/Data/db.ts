import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

export async function main() {
}

export async function CreateBoard(_name: string, _id : string, _owner : string){
  await prisma.board.create({
    data: {
      name: _name,
      id: _id,
      owner: _owner,
    }
  })
  console.log(await prisma.board.findMany());
}

export async function GetCoursesOfBoard(_boardID : string){
  return await prisma.assignment.findMany({
    where:{
      boardId: {
        equals: _boardID
      }
    }
  })
  console.log(await prisma.assignment.findMany());
}



export async function CreateAssignment(_id : string, _boardID : string, _canvasId: number){
  await prisma.assignment.create({
    data: {
      id: _id,
      canvasId: _canvasId,
      boardId: _boardID
    }
  })
  console.log(await prisma.assignment.findMany());
}

export async function LinkBoardToCourse(_boardID : string, _course : number){
  return await prisma.course.create({
    data: {
      boardId: _boardID,
      canvasId: _course
    }
  })
}

export async function GetAssignments(_boardID : string){
  return await prisma.assignment.findMany( {
    where:{
      boardId: {
        equals: _boardID
      }
    }
  })
}

export async function CreateTasks(Id : string, AssignmentId : string, Status : string, Name : string){
  prisma.tasks.create({
   data:{
    id: Id,
    status: Status,
    name: Name,
    assignmentID: AssignmentId
   }
  })
}

export async function GetTasks(Id : string){
  return await prisma.tasks.findMany({
    where:{
      assignmentID: {
        equals: Id
      }
    }
  })
}

export async function GetAllBoard(_owner : string){
  return await prisma.board.findMany({
    where:{
      owner: {
        equals: _owner
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
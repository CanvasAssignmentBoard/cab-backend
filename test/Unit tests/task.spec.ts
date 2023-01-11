import { Test, TestingModule } from '@nestjs/testing';
import TaskLogic from '../../src/Logic/TaskLogic';
import ITaskLogic from '../../src/Logic/ITaskLogic';
import MockCanvas from '../Mock/MockCanvas';
import DB from '../../src/Data/db';
import Prisma from '../../src/Data/Prisma';
import { CreateTaskBody } from '../../src/Bodies/CreateTaskBody';
import MockPrisma from '../Mock/MockPrisma';
import { randomUUID } from 'crypto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('Task Logic', () => {
    let logic: ITaskLogic = new TaskLogic(new MockCanvas(), new DB(new Prisma()));
    let mockDB : MockPrisma = new MockPrisma(new Prisma);

    describe('Get Tasks for assignment', () => {
        it('GT08: Returns a list of all task objects for the assignment', async () => {
            let boardID = randomUUID();
            let rowID = randomUUID();
            let assignmentID = randomUUID();

            await mockDB.CreateBoard(boardID);
            await mockDB.CreateRow(rowID, true, boardID);
            await mockDB.CreateAssignment(rowID, assignmentID);
            await mockDB.CreateTasks(assignmentID, randomUUID());
            expect(await logic.GetTasks(assignmentID)).toHaveLength(1);
        });

        it('GT09: Returns error “Invalid assignmentID”', async () => {
            await expect(logic.GetTasks("")).rejects.toEqual(new HttpException('Invalid assignmentID', HttpStatus.BAD_REQUEST));
        });
    });

    describe('Create task for assignment', () => {
        it('CT10: Creates a task for an assignment', async () => {
            let boardID = randomUUID();
            let rowID = randomUUID();
            let assignmentID = randomUUID();

            await mockDB.CreateBoard(boardID);
            await mockDB.CreateRow(rowID, true, boardID);
            await mockDB.CreateAssignment(rowID, assignmentID);
            let body : CreateTaskBody = {  
                AssignmentId: assignmentID,
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.CreateTask(body)).toHaveProperty("id");
        });

        it('CT11: Returns error “Invalid assignmentID”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: null,
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            await expect(logic.CreateTask(body)).rejects.toEqual(new HttpException('Missing assignmentID', HttpStatus.BAD_REQUEST));
        });

        it('CT11: Returns error “Invalid status”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : null,
                Name : "testName",
                DueDate : "testDueDate",
            }
            await expect(logic.CreateTask(body)).rejects.toEqual(new HttpException('Missing Status', HttpStatus.BAD_REQUEST));
        });

        it('CT13: Returns error “Invalid Name”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : null,
                DueDate : "testDueDate",
            }
            await expect(logic.CreateTask(body)).rejects.toEqual(new HttpException('Missing Name', HttpStatus.BAD_REQUEST));
        });

        it('CT14: Returns error “Invalid DueDate”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : null,
            }
            await expect(logic.CreateTask(body)).rejects.toEqual(new HttpException('Missing Date', HttpStatus.BAD_REQUEST));
        });
    });

    describe('Edit task for assignment', () => {
        it('ET15: Edits a task for an assignment', async () => {
            let boardID = randomUUID();
            let rowID = randomUUID();
            let assignmentID = randomUUID();
            let taskID = randomUUID();

            await mockDB.CreateBoard(boardID);
            await mockDB.CreateRow(rowID, true, boardID);
            await mockDB.CreateAssignment(rowID, assignmentID);
            await mockDB.CreateTasks(assignmentID, taskID);

            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.Edit(taskID, body)).toStrictEqual(true);
        });

        it('ET16: Returns error “Invalid TaskID', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: null,
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            await expect(logic.Edit("invalid", body)).rejects.toEqual(new HttpException('Invalid TaskID', HttpStatus.BAD_REQUEST));
        });

        it('ET17: Returns error “Invalid status”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : null,
                Name : "testName",
                DueDate : "testDueDate",
            }
            await expect(logic.Edit("invalid", body)).rejects.toEqual(new HttpException('Invalid Status', HttpStatus.BAD_REQUEST));
        });

        it('ET18: Returns error “Invalid Name”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : null,
                DueDate : "testDueDate",
            }
            await expect(logic.Edit("invalid", body)).rejects.toEqual(new HttpException('Invalid Name', HttpStatus.BAD_REQUEST));
        });

        it('ET19: Returns error “Invalid DueDate”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : null,
            }
            await expect(logic.Edit("invalid", body)).rejects.toEqual(new HttpException('Invalid Date', HttpStatus.BAD_REQUEST));
        });
    });

    describe('Delete task for assignment', () => {
        it('DT20: Deletes a task for an assignment', async () => {
            let boardID = randomUUID();
            let rowID = randomUUID();
            let assignmentID = randomUUID();
            let taskID = randomUUID();

            await mockDB.CreateBoard(boardID);
            await mockDB.CreateRow(rowID, true, boardID);
            await mockDB.CreateAssignment(rowID, assignmentID);
            await mockDB.CreateTasks(assignmentID, taskID);
            expect(await logic.Delete(taskID)).toHaveProperty("id", taskID);
        });

        it('DT21: Returns error “Invalid assignmentID”', async () => {
            expect(await logic.Delete("")).toStrictEqual(false);
        });
    });
});
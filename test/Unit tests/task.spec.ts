import { Test, TestingModule } from '@nestjs/testing';
import TaskLogic from '../../src/Logic/TaskLogic';
import ITaskLogic from '../../src/Logic/ITaskLogic';
import MockCanvas from '../Mock/MockCanvas';
import DB from '../../src/Data/db';
import Prisma from '../../src/Data/Prisma';
import { CreateTaskBody } from '../../src/Bodies/CreateTaskBody';
import MockPrisma from '../Mock/MockPrisma';

describe('Task Logic', () => {
    let logic: ITaskLogic = new TaskLogic(new MockCanvas(), new DB(new Prisma()));
    let mockDB : MockPrisma = new MockPrisma(new Prisma);

    describe('Get Tasks for assignment', () => {
        it('GT08: Returns a list of all task objects for the assignment', async () => {
            expect(await logic.GetTasks("TestID")).toStrictEqual("test");
        });

        it('GT09: Returns error “Invalid assignmentID”', async () => {
            expect(await logic.GetTasks("")).toStrictEqual(false);
        });
    });

    describe('Create task for assignment', () => {
        it('CT10: Creates a task for an assignment', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.CreateTask(body)).toStrictEqual(true);
        });

        it('CT11: Returns error “Invalid assignmentID”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: null,
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.CreateTask(body)).toStrictEqual(false);
        });

        it('CT11: Returns error “Invalid status”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : null,
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.CreateTask(body)).toStrictEqual(false);
        });

        it('CT13: Returns error “Invalid Name”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : null,
                DueDate : "testDueDate",
            }
            expect(await logic.CreateTask(body)).toStrictEqual(false);
        });

        it('CT14: Returns error “Invalid DueDate”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : null,
            }
            expect(await logic.CreateTask(body)).toStrictEqual(false);
        });
    });

    describe('Edit task for assignment', () => {
        it('ET15: Edits a task for an assignment', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.Edit("testID", body)).toStrictEqual(true);
        });

        it('ET16: Returns error “Invalid assignmentID”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: null,
                Status : "testStatus",
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.Edit("testID", body)).toStrictEqual(false);
        });

        it('ET17: Returns error “Invalid status”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : null,
                Name : "testName",
                DueDate : "testDueDate",
            }
            expect(await logic.Edit("testID", body)).toStrictEqual(false);
        });

        it('ET18: Returns error “Invalid Name”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : null,
                DueDate : "testDueDate",
            }
            expect(await logic.Edit("testID", body)).toStrictEqual(false);
        });

        it('ET19: Returns error “Invalid DueDate”', async () => {
            let body : CreateTaskBody = {  
                AssignmentId: "TestID",
                Status : "testStatus",
                Name : "testName",
                DueDate : null,
            }
            expect(await logic.Edit("testID", body)).toStrictEqual(false);
        });
    });

    describe('Delete task for assignment', () => {
        it('DT20: Deletes a task for an assignment', async () => {
            expect(await logic.Delete("TestID")).toStrictEqual(false);
        });

        it('DT21: Returns error “Invalid assignmentID”', async () => {
            expect(await logic.Delete("")).toStrictEqual(false);
        });
    });
});
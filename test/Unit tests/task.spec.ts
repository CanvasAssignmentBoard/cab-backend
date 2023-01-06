import { Test, TestingModule } from '@nestjs/testing';
import TaskLogic from '../../src/Logic/TaskLogic';
import ITaskLogic from '../../src/Logic/ITaskLogic';
import MockCanvas from 'test/Mock/MockCanvas';

describe('Task Logic', () => {
    let logic: ITaskLogic;

    beforeEach(async () => {
    logic = new TaskLogic(new MockCanvas(),)
    });


    describe('Get Tasks for assignment', () => {
        it('GT08: Returns a list of all task objects for the assignment', async () => {
            expect(logic.GetTasks("TestID")).toStrictEqual();
        });

        it('GT09: Returns error “Invalid assignmentID”', async () => {
            expect(logic.GetTasks("")).toStrictEqual();
        });
    });

    describe('Create task for assignment', () => {
        it('CT10: Creates a task for an assignment', async () => {
            expect(logic.CreateTask("TestID")).toStrictEqual();
        });

        it('CT11: Returns error “Invalid assignmentID”', async () => {
            expect(logic.CreateTask("")).toStrictEqual();
        });

        it('CT11: Returns error “Invalid status”', async () => {
            expect(logic.CreateTask("")).toStrictEqual();
        });

        it('CT13: Returns error “Invalid Name”', async () => {
            expect(logic.CreateTask("")).toStrictEqual();
        });

        it('CT14: Returns error “Invalid DueDate”', async () => {
            expect(logic.CreateTask("")).toStrictEqual();
        });
    });

    describe('Edit task for assignment', () => {
        it('ET15: Edits a task for an assignment', async () => {
            expect(logic.Edit("TestID")).toStrictEqual();
        });

        it('ET16: Returns error “Invalid assignmentID”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });

        it('ET17: Returns error “Invalid status”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });

        it('ET18: Returns error “Invalid Name”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });

        it('ET19: Returns error “Invalid DueDate”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });
    });

    describe('Delete task for assignment', () => {
        it('DT20: Deletes a task for an assignment', async () => {
            expect(logic.Delete("TestID")).toStrictEqual();
        });

        it('DT21: Returns error “Invalid assignmentID”', async () => {
            expect(logic.Delete("")).toStrictEqual();
        });
    });
});
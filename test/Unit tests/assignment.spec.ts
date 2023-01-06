import { Test, TestingModule } from '@nestjs/testing';
import AssignmentLogic from '../../src/Logic/AssignmentLogic';
import IAssignmentLogic from '../../src/Logic/IAssignmentLogic';
import Canvas from '../../src/canvas/canvas';
import DB from 'src/Data/db';
import { MockContext, Context, createMockContext } from '../Mock/MockPrisma'

describe('Task Logic', () => {
    let logic: IAssignmentLogic;
    let mockCtx: MockContext
    let ctx: Context

    beforeEach(async () => { 
        mockCtx = createMockContext()
        ctx = mockCtx as unknown as Context
        logic = new AssignmentLogic(new Canvas(), new DB(ctx.prisma))
    });

    describe('Create assignment', () => {
        it('CA22: Edits a task for an assignment', async () => {
            
            expect(logic.("TestID")).toStrictEqual();
        });

        it('CA23: Returns error “Invalid assignmentID”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });

        it('CA24: Returns error “Invalid status”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });

        it('CA25: Returns error “Invalid Name”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });

        it('CA26: Returns error “Invalid DueDate”', async () => {
            expect(logic.Edit("")).toStrictEqual();
        });
    });

});
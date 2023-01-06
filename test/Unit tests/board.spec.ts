import { Test, TestingModule } from '@nestjs/testing';
import Canvas from '../../src/canvas/canvas';
import { BoardLogic } from 'src/Logic/boardLogic';
import IBoardLogic from 'src/Logic/IBoardLogic';

describe('Task Logic', () => {
    let logic: IBoardLogic;

    beforeEach(async () => {
    logic = new BoardLogic(new Canvas())
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
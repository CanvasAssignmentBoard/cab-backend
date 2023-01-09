import AssignmentLogic from '../../src/Logic/AssignmentLogic';
import IAssignmentLogic from '../../src/Logic/IAssignmentLogic';
import DB from '../../src/Data/db';
import Prisma from '../../src/Data/Prisma';
import CreateAssignmentBody from '../../src/Bodies/CreateAssignmentBody';
import { HttpException, HttpStatus } from '@nestjs/common';
import MockCanvas from '../Mock/MockCanvas';

describe('Task Logic', () => {
    let logic: IAssignmentLogic = new AssignmentLogic(new MockCanvas(), new DB(new Prisma()));

    describe('Create assignment', () => {
        it('CA22: creates assignment', async () => {
            let body : CreateAssignmentBody = {
                courseID: 123,
                name: 'TestName',
                description: 'Test description',
                due_at: new Date().toISOString()
            };
            await expect(logic.CreateAssignment(body)).toStrictEqual("");
        });

        it('CA23: Returns error “Invalid name”', async () => {
            let body : CreateAssignmentBody = {
                courseID: 123,
                name: null,
                description: 'Test description',
                due_at: new Date().toISOString()
            };
            await expect(logic.CreateAssignment(body)).rejects.toEqual(new HttpException('Invalid ID', HttpStatus.BAD_REQUEST));
        });

        it('CA24: Returns error “Invalid DueDate”', async () => {
            let body : CreateAssignmentBody = {
                courseID: 123,
                name: 'TestName',
                description: 'Test description',
                due_at: null
            };
            await expect(logic.CreateAssignment(body)).toStrictEqual("");
        });

        it('CA25: Returns error “Invalid course id”', async () => {
            let body : CreateAssignmentBody = {
                courseID: null,
                name: 'TestName',
                description: 'Test description',
                due_at: new Date().toISOString()
            };
            await expect(logic.CreateAssignment(body)).rejects.toEqual(new HttpException('Invalid course ID', HttpStatus.BAD_REQUEST));
        });
    });

});
import 'reflect-metadata';
import { BoardLogic } from '../../src/Logic/boardLogic';
import IBoardLogic from '../../src/Logic/IBoardLogic';
import { BoardCreateBody } from '../../src/Bodies/BoardCreateBody';
import Prisma from '../../src/Data/Prisma';
import DB from '../../src/Data/db';
import MockPrisma from '../Mock/MockPrisma';
import { HttpStatus } from '@nestjs/common';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { randomUUID } from 'crypto';
import MockCanvas from '../Mock/MockCanvas';
import Canvas from '../../src/canvas/canvas';

describe('Board Logic', () => {
    let logic: IBoardLogic = new BoardLogic(new MockCanvas(), new DB(new Prisma()));
    let mockDB : MockPrisma = new MockPrisma(new Prisma);

        it('BC01: Create board with valid data', async () => {
            let data : BoardCreateBody = {
                name: 'Test Board',
                courses: [111,112],
                rows: ["testrow1", "testrow2"]
            }
            expect(await logic.CreateBoard(data)).toHaveProperty('name');
        });

        it('BC02: Returns error “Board name missing”', async () => {
            let data : BoardCreateBody = {
                name: null,
                courses: [111,112],
                rows: ["testrow1", "testrow2"]
            }
            await expect(logic.CreateBoard(data)).rejects.toEqual(new HttpException('Missing board name', HttpStatus.BAD_REQUEST));
        });

        it('BC03: Returns error “Missing courses”', async () => {
            let data : BoardCreateBody = {
                name: 'Test Board',
                courses: [],
                rows: ["testrow1", "testrow2"]
            }
            await expect(logic.CreateBoard(data)).rejects.toEqual(new HttpException('Missing courses', HttpStatus.BAD_REQUEST));
            
             
        });
        it('BC27: Returns error “rows”', async () => {
            let data : BoardCreateBody = {
                name: 'Test Board',
                courses: [111,112],
                rows: []
            }
            await expect(logic.CreateBoard(data)).rejects.toEqual(new HttpException('Missing rows', HttpStatus.BAD_REQUEST));
        });

        it('GB04: Retrieve board with valid id', async () => {
            let id = randomUUID();
            await mockDB.CreateBoard(id);
             expect(await logic.getBoardById(id)).toHaveProperty('id', id);
        });

        it('GB05: Retrieve board with invalid id return “Invalid boardId”', async () => {
            await expect(logic.getBoardById(null)).rejects.toEqual(new HttpException('Invalid ID', HttpStatus.BAD_REQUEST));
        });

});
import MockCanvas from '../Mock/MockCanvas';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TaskController } from '../../src/task.controller';
import { BoardController } from '../../src/board.controller';
import Prisma from '../../src/Data/Prisma';
import DB from '../../src/Data/db';
import { INestApplication } from '@nestjs/common';
import Canvas from '../../src/canvas/canvas';

describe('Integration test', () => {
    it('should expect OK 200', async () => {
        jest.setTimeout(60000);

        let app: INestApplication;

        const moduleRef = await Test.createTestingModule({
            controllers: [
                BoardController,
              ],
              providers: [Prisma, Canvas, DB],
          }).overrideProvider(Canvas).useClass(MockCanvas).compile();
      
          app = moduleRef.createNestApplication();
          await app.init();

          await request(await app.getHttpServer()).post('/board/create').send({
            "name":"test",
            "courses": [123],
            "rows":["testrow"]      
          }).expect(201)

          app.close();
        });

});

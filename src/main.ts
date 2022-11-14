import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedList = ['http://localhost:3001'];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedList.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  });

  await app.listen(3000);
}
bootstrap();

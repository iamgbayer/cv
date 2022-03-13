import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:4000',
    },
  });
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();

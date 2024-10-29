import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import saveActorState from './actor/actor.init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await saveActorState();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

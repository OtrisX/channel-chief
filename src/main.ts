import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './discord.module';
import { ValidationPipe } from '@nestjs/common';
import {
  BotError,
  BotInputExceptionFilter,
} from './shared/filters/botException.filter';

async function bootstrap() {
  const app = await NestFactory.create(DiscordModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        throw new BotError(errors);
      },
    }),
  );

  app.useGlobalFilters(new BotInputExceptionFilter());

  await app.listen(3000);
}
bootstrap();

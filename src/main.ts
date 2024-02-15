import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './discord.module';
import {
  BotError,
  BotInputExceptionFilter,
} from './shared/filters/botException.filter';

async function bootstrap() {
  const app = await NestFactory.create(DiscordModule);

  app.useGlobalFilters(new BotInputExceptionFilter());

  await app.listen(3000);
}
bootstrap();

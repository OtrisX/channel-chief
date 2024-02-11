import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import { ConfigModule } from '@nestjs/config';
import { VoiceCommands } from './voice/voice.command';
import { AppService } from './app.controller';
import { VoiceModule } from './voice/voice.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID],
    }),
    VoiceModule,
  ],
  providers: [AppService],
})
export class DiscordModule {}

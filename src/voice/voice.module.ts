import { Module } from '@nestjs/common';
import { VoiceCommands } from './voice.command';
import { VoiceController } from './voice.controller';

@Module({
  providers: [VoiceCommands, VoiceController],
})
export class VoiceModule {}

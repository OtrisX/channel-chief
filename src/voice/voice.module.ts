import { Module } from '@nestjs/common';
import { VoiceCommands } from './voice.command';
import { VoiceController } from './voice.controller';
import { PrismaService } from 'src/prisma.service';
import { VoiceHubCreateService } from './services/voiceHubCreate.service';
import { OnVoiceHubjoin } from './services/onVoiceHubJoin.service';
import { OnVoiceTempLeft } from './services/onVoiceTempLeft.service';
import { OnVoiceHubDelete } from './services/onVoiceHubDelete.service';
import { GetVoiceOwnerService } from './services/getVoiceOwner.service';
import { OnVoiceBanService } from './services/onVoiceban.service';
import { OnVoiceTransferService } from './services/onVoiceTransfer.service';
import { OnVoiceUnbanService } from './services/onVoiceUnban.service';
import { OnVoiceKickService } from './services/onVoiceKick.service';

@Module({
  providers: [
    VoiceCommands,
    VoiceController,
    PrismaService,
    VoiceHubCreateService,
    OnVoiceHubjoin,
    OnVoiceTempLeft,
    OnVoiceHubDelete,
    GetVoiceOwnerService,
    OnVoiceBanService,
    OnVoiceTransferService,
    OnVoiceUnbanService,
    OnVoiceKickService,
  ],
})
export class VoiceModule {}

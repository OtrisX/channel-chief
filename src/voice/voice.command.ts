import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { VoiceHubCreateDto } from './dto/voiceHubCreate.dto';
import { VoiceHubCreateService } from './services/voiceHubCreate.service';
import { GetVoiceOwnerService } from './services/getVoiceOwner.service';
import { VoiceBanDto } from './dto/voiceBan.dto';
import { BotError } from 'src/shared/filters/botException.filter';
import { OnVoiceBanService } from './services/onVoiceban.service';
import { VoiceTransferDto } from './dto/voiceTransfer.dto';
import { OnVoiceTransferService } from './services/onVoiceTransfer.service';
import { OnVoiceUnbanService } from './services/onVoiceUnban.service';
import { VoiceUnbanDto } from './dto/voiceUnban.dto';
import { VoiceKickDto } from './dto/voiceKick.dto';
import { OnVoiceKickService } from './services/onVoiceKick.service';

@Injectable()
export class VoiceCommands {
  constructor(
    private readonly voiceHubCreateService: VoiceHubCreateService,
    private readonly getVoiceOwnerService: GetVoiceOwnerService,
    private readonly onVoiceBanService: OnVoiceBanService,
    private readonly onVoiceTransferService: OnVoiceTransferService,
    private readonly onVoiceUnbanService: OnVoiceUnbanService,
    private readonly onVoiceKickService: OnVoiceKickService,
  ) {}

  @SlashCommand({
    name: 'voice-owner',
    description: 'Check ownership of the voice channel',
  })
  public async getVoiceOwner(@Context() [interaction]: SlashCommandContext) {
    return this.getVoiceOwnerService.getVoiceOwner([interaction]);
  }

  @SlashCommand({
    name: 'voice-hub-create',
    description: 'Create a voice hub',
  })
  public async onVoiceHubCreate(
    @Context() [interaction]: SlashCommandContext,
    @Options(
      new ValidationPipe({
        validateCustomDecorators: true,
        exceptionFactory: (errors) => {
          throw new BotError(errors);
        },
      }),
    )
    voiceHubCreateDto: VoiceHubCreateDto,
  ) {
    return this.voiceHubCreateService.onVoiceHubCreate(
      [interaction],
      voiceHubCreateDto,
    );
  }

  @SlashCommand({
    name: 'voice-transfer',
    description: 'Transfer ownership of the voice channel',
  })
  public async onVoiceTransfer(
    @Context() [interaction]: SlashCommandContext,
    @Options() voiceTransferOptions: VoiceTransferDto,
  ) {
    return this.onVoiceTransferService.onVoiceTransfer(
      [interaction],
      voiceTransferOptions,
    );
  }

  @SlashCommand({
    name: 'voice-ban',
    description: 'Ban a user from the voice channel',
  })
  public async onVoiceBan(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    voiceBanOptions: VoiceBanDto,
  ) {
    return this.onVoiceBanService.onVoiceBan([interaction], voiceBanOptions);
  }

  @SlashCommand({
    name: 'voice-unban',
    description: 'Unban a user from the voice channel',
  })
  public async onVoiceUnban(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    voiceUnbanOptions: VoiceUnbanDto,
  ) {
    return this.onVoiceUnbanService.onVoiceUnban(
      [interaction],
      voiceUnbanOptions,
    );
  }

  @SlashCommand({
    name: 'voice-kick',
    description: 'Kick a user from the voice channel',
  })
  public async onVoiceKick(
    @Context() [interaction]: SlashCommandContext,
    @Options() voiceKickOptions: VoiceKickDto,
  ) {
    return this.onVoiceKickService.onVoiceKick([interaction], voiceKickOptions);
  }
}

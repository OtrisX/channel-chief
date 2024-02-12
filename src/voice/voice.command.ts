import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { VoiceServices } from './voice.service';
import { VoiceHubCreateDto } from './dto/voiceHubCreate.dto';

@Injectable()
export class VoiceCommands {
  @SlashCommand({
    name: 'voice-owner',
    description: 'Check ownership of the voice channel',
  })
  public async onVoiceOwner(@Context() [interaction]: SlashCommandContext) {
    return VoiceServices.onVoiceOwner([interaction]);
  }

  @SlashCommand({
    name: 'voice-hub-create',
    description: 'Create a voice hub',
  })
  public async onVoiceHubCreate(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    voiceHubCreateDto: VoiceHubCreateDto,
  ) {
    return VoiceServices.onVoiceHubCreate([interaction], voiceHubCreateDto);
  }

  // @SlashCommand({
  //   name: 'voice-transfer',
  //   description: 'Transfer ownership of the voice channel',
  // })
  // public async onVoiceTransfer(@Context() [interaction]: SlashCommandContext) {
  //   return VoiceServices.onVoiceTransfer([interaction]);
  // }

  // @SlashCommand({
  //   name: 'voice-ban',
  //   description: 'Ban a user from the voice channel',
  // })
  // public async onVoiceBan(@Context() [interaction]: SlashCommandContext) {
  //   return VoiceServices.onVoiceBan([interaction]);
  // }

  // @SlashCommand({
  //   name: 'voice-kick',
  //   description: 'Kick a user from the voice channel',
  // })
  // public async onVoiceKick(@Context() [interaction]: SlashCommandContext) {
  //   return VoiceServices.onVoiceKick([interaction]);
  // }

  // @SlashCommand({
  //   name: 'voice-unban',
  //   description: 'Unban a user from the voice channel',
  // })
  // public async onVoiceUnban(@Context() [interaction]: SlashCommandContext) {
  //   return VoiceServices.onVoiceUnban([interaction]);
  // }
}

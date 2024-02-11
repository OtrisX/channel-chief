import { Injectable, Logger } from '@nestjs/common';
import { NewsChannel } from 'discord.js';
import { Once, On, Context, ContextOf } from 'necord';

const voiceChannelEmojis: string[] = ['🟥', '🟧', '🟨', '🟦', '🟪', '🟫', '🌈'];

@Injectable()
export class VoiceController {
  @On('voiceChannelJoin')
  public async onJoin(@Context() [interaction]: ContextOf<'voiceChannelJoin'>) {
    try {
      const member = interaction.guild.members.resolve(interaction.user.id);
      const channel = interaction.guild.channels.resolve(
        member.voice.channelId,
      );

      if (!channel.name.startsWith('🟩')) return;
      const randomEmoji =
        voiceChannelEmojis[
          Math.floor(Math.random() * voiceChannelEmojis.length)
        ];

      const tempVoiceChannel = await interaction.guild.channels.create({
        name: `${randomEmoji} - ${member.displayName}`,
        type: 2,
        parent: channel.parentId,
      });

      await member.voice.setChannel(tempVoiceChannel.id);
    } catch (error) {
      console.error(error);
    }
  }

  @On('voiceStateUpdate')
  public async onLeave(
    @Context() [oldState, newState]: ContextOf<'voiceStateUpdate'>,
  ) {
    const regex = new RegExp(`^${voiceChannelEmojis.join('|')}`);

    if (oldState.channel === null) return;
    if (oldState.channel.name.startsWith('🟩')) return;

    try {
      if (regex.test(oldState.channel.name))
        oldState.channel.members.size === 0
          ? await oldState.channel.delete()
          : null;
    } catch (error) {
      console.error(error);
    }
  }
}

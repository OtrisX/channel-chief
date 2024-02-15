import { Catch, Injectable } from '@nestjs/common';
import { EmbedBuilder, VoiceChannel } from 'discord.js';
import { Context, ContextOf, SlashCommandContext } from 'necord';
import { PrismaService } from 'src/prisma.service';
import { VoiceKickDto } from '../dto/voiceKick.dto';

@Injectable()
export class OnVoiceKickService {
  constructor(private prisma: PrismaService) {}

  async onVoiceKick(
    [interaction]: SlashCommandContext,
    { user }: VoiceKickDto,
  ) {
    try {
      const userCaller = interaction.guild.members.resolve(
        interaction.member.user.id,
      );
      const userToKick = interaction.guild.members.resolve(user.id);

      const tempChannel = await this.prisma.voiceChannelsTemp.findUnique({
        where: {
          id: interaction.channelId,
        },
      });

      if (!tempChannel)
        throw new Error('This is not a valid channel to kick a user');

      if (userCaller.id != tempChannel.ownerId)
        throw new Error('You are not the owner of this channel');

      if (userCaller.voice.channelId !== userToKick.voice.channelId)
        throw new Error(
          'You are not in the same channel as the user you want to kick',
        );

      if (userCaller.id === userToKick.id)
        throw new Error('You cannot kick yourself');

      await userToKick.voice.setChannel(null);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setDescription(
          `${userToKick.displayName} has been kicked from the channel`,
        );

      return await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embedErrors = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription(error.message);

      return await interaction.reply({
        embeds: [embedErrors],
        ephemeral: true,
      });
    }
  }
}

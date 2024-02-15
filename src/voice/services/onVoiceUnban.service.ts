import { Catch, Injectable } from '@nestjs/common';
import { EmbedBuilder, VoiceChannel } from 'discord.js';
import { Context, ContextOf, SlashCommandContext } from 'necord';
import { PrismaService } from 'src/prisma.service';
import { VoiceUnbanDto } from '../dto/voiceUnban.dto';

@Injectable()
export class OnVoiceUnbanService {
  constructor(private prisma: PrismaService) {}

  async onVoiceUnban(
    [interaction]: SlashCommandContext,
    { user }: VoiceUnbanDto,
  ) {
    try {
      const userCaller = interaction.guild.members.resolve(
        interaction.member.user.id,
      );
      const userToUnban = interaction.guild.members.resolve(user.id);

      const tempChannel = await this.prisma.voiceChannelsTemp.findUnique({
        where: {
          id: interaction.channelId,
        },
      });

      if (!tempChannel)
        throw new Error('This is not a valid channel to unban a user');

      if (userCaller.id != tempChannel.ownerId)
        throw new Error('You are not the owner of this channel');

      if (userCaller.voice.channelId !== userToUnban.voice.channelId)
        throw new Error(
          'You are not in the same channel as the user you want to unban',
        );

      if (userCaller.id === userToUnban.id)
        throw new Error('You cannot unban yourself');

      const channel = interaction.guild.channels.resolve(
        tempChannel.id,
      ) as VoiceChannel;

      await channel.permissionOverwrites.create(userToUnban.id, {
        Connect: true,
      });

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setDescription(
          `${userToUnban.displayName} has been unbanned from the channel`,
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

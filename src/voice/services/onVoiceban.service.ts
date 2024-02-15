import { Catch, Injectable } from '@nestjs/common';
import { EmbedBuilder, VoiceChannel } from 'discord.js';
import { Context, ContextOf, SlashCommandContext } from 'necord';
import { PrismaService } from 'src/prisma.service';
import { VoiceBanDto } from '../dto/voiceBan.dto';

@Injectable()
export class OnVoiceBanService {
  constructor(private prisma: PrismaService) {}

  async onVoiceBan([interaction]: SlashCommandContext, { user }: VoiceBanDto) {
    try {
      const userCaller = interaction.guild.members.resolve(
        interaction.member.user.id,
      );
      const userToban = interaction.guild.members.resolve(user.id);

      const tempChannel = await this.prisma.voiceChannelsTemp.findUnique({
        where: {
          id: interaction.channelId,
        },
      });

      if (!tempChannel)
        throw new Error('This is not a valid channel to ban a user');

      if (userCaller.id != tempChannel.ownerId)
        throw new Error('You are not the owner of this channel');

      if (userCaller.voice.channelId !== userToban.voice.channelId)
        throw new Error(
          'You are not in the same channel as the user you want to ban',
        );

      if (userCaller.id === userToban.id)
        throw new Error('You cannot ban yourself');

      const channel = interaction.guild.channels.resolve(
        tempChannel.id,
      ) as VoiceChannel;

      await channel.permissionOverwrites.create(userToban.id, {
        Connect: false,
      });

      await userToban.voice.setChannel(null);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setDescription(
          `${userToban.displayName} has been banned from the channel`,
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

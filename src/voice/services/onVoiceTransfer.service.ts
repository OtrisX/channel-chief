import { Catch, Injectable } from '@nestjs/common';
import { Context, ContextOf, SlashCommandContext } from 'necord';
import { PrismaService } from 'src/prisma.service';
import { VoiceTransferDto } from '../dto/voiceTransfer.dto';
import { EmbedBuilder, GuildMember } from 'discord.js';

@Injectable()
export class OnVoiceTransferService {
  constructor(private prisma: PrismaService) {}

  async onVoiceTransfer(
    [interaction]: SlashCommandContext,
    { user }: VoiceTransferDto,
  ) {
    try {
      const userCaller = interaction.guild.members.resolve(
        interaction.member.user.id,
      );

      const transferToUser = interaction.guild.members.resolve(user.id);

      const tempChannel = await this.prisma.voiceChannelsTemp.findUnique({
        where: {
          id: interaction.channelId,
        },
      });

      if (!tempChannel)
        throw new Error('This is not a valid channel to transfer ownership');

      const members = interaction.guild.channels.resolve(tempChannel.id)
        .members as Map<string, GuildMember>;

      if (!members.has(transferToUser.id))
        throw new Error(
          'The user you want to transfer ownership to is not in the channel',
        );

      if (userCaller.id === transferToUser.id)
        throw new Error('You cannot transfer ownership to yourself');

      if (userCaller.id !== tempChannel.ownerId)
        throw new Error('You are not the owner of this channel');

      await this.prisma.voiceChannelsTemp.update({
        where: {
          id: tempChannel.id,
        },
        data: {
          ownerId: transferToUser.id,
        },
      });

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setDescription(
          `<@${transferToUser.id}> is now the owner of the channel`,
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

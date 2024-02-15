import { Catch, Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Context, ContextOf, SlashCommandContext } from 'necord';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GetVoiceOwnerService {
  constructor(private prisma: PrismaService) {}

  async getVoiceOwner([interaction]: SlashCommandContext) {
    try {
      const userId = interaction.member.user.id;
      const channelId = interaction.channelId;

      const tempChannel = await this.prisma.voiceChannelsTemp.findUnique({
        where: {
          id: channelId,
        },
      });

      if (!tempChannel) throw new Error('This is not a valid channel');

      const embed = new EmbedBuilder()
        .setColor('#808080')
        .setDescription('Voice owner')
        .setDescription(`Voice owner: <@${tempChannel.ownerId}>`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
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

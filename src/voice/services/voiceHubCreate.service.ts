import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { VoiceHubCreateDto } from '../dto/voiceHubCreate.dto';
import { PrismaService } from 'src/prisma.service';
import { EmbedBuilder } from 'discord.js';

@Injectable()
export class VoiceHubCreateService {
  constructor(private prisma: PrismaService) {}

  async onVoiceHubCreate(
    [interaction]: SlashCommandContext,
    voiceHubCreateDto: VoiceHubCreateDto,
  ) {
    try {
      const { name, parentId } = voiceHubCreateDto;
      const guildId = interaction.guildId;

      const guildExists = await this.prisma.guild.findUnique({
        where: {
          id: guildId,
        },
      });

      if (!guildExists) {
        await this.prisma.guild.create({
          data: {
            id: guildId,
          },
        });
      }

      const voiceHub = await interaction.guild.channels.create({
        name: name,
        type: 2,
        parent: parentId,
      });

      await this.prisma.voiceChannelsHub.create({
        data: {
          id: String(voiceHub.id),
          guildId: guildId,
          voiceChannelTempAlias: String(voiceHubCreateDto.tempChannelAlias),
        },
      });

      const embedErrors = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription('Voice hub created successfully!')
        .setFields([
          {
            name: 'Voice Hub Name',
            value: name,
            inline: false,
          },
          {
            name: 'Parent Category',
            value: `<#${parentId}>`,
            inline: false,
          },
          {
            name: 'Temp Channel Alias',
            value: voiceHubCreateDto.tempChannelAlias,
            inline: false,
          },
        ]);

      return await interaction.reply({
        embeds: [embedErrors],
        ephemeral: true,
      });
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

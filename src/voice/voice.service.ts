import { SlashCommandContext } from 'necord';
import { VoiceHubCreateDto } from './dto/voiceHubCreate.dto';
import { EmbedBuilder } from 'discord.js';

export class VoiceServices {
  static async onVoiceOwner([interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'piru' });
  }

  static async onVoiceHubCreate(
    [interaction]: SlashCommandContext,
    voiceHubCreateDto: VoiceHubCreateDto,
  ) {
    try {
      await interaction.guild.channels.create({
        name: `🟩 - ${voiceHubCreateDto.name}`,
        type: 2,
      });

      const embedErrors = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription('Voice hub created successfully!');

      return await interaction.reply({
        embeds: [embedErrors],
        ephemeral: true,
      });
    } catch (error) {
      const embedErrors = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription('An error occurred while creating the voice hub');

      return await interaction.reply({
        embeds: [embedErrors],
        ephemeral: true,
      });
    }
  }
}

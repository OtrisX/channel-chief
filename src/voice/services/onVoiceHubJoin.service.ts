import { Catch, Injectable } from '@nestjs/common';
import { Context, ContextOf } from 'necord';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OnVoiceHubjoin {
  constructor(private prisma: PrismaService) {}

  async onVoicehubJoin([oldState, newState]: ContextOf<'voiceStateUpdate'>) {
    try {
      if (newState.channelId === null) return;

      const member = newState.member;
      const channel = newState.channel;

      const hubChannel = await this.prisma.voiceChannelsHub.findUnique({
        where: {
          id: String(channel.id),
        },
      });

      if (!hubChannel) return;

      const tempChannel = await oldState.guild.channels.create({
        name: `${hubChannel.voiceChannelTempAlias} | ${member.displayName}`,
        type: 2,
        parent: channel.parentId,
      });

      await this.prisma.voiceChannelsTemp.create({
        data: {
          ownerId: member.id,
          id: String(tempChannel.id),
          voiceChannelHubId: String(hubChannel.id),
        },
      });

      await member.voice.setChannel(tempChannel.id);

      await tempChannel.permissionOverwrites.create(member.id, {
        MuteMembers: true,
        MoveMembers: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

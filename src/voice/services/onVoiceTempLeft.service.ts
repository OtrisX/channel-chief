import { Catch, Injectable } from '@nestjs/common';
import { Context, ContextOf } from 'necord';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OnVoiceTempLeft {
  constructor(private prisma: PrismaService) {}

  async onVoicehubJoin([oldState, _]: ContextOf<'voiceStateUpdate'>) {
    try {
      const tempChannel = await this.prisma.voiceChannelsTemp.findUnique({
        where: {
          id: String(oldState.channelId),
        },
      });

      if (!tempChannel) return;

      if (oldState.channel.members.size != 0) return;

      const channel = oldState.guild.channels.resolve(tempChannel.id);

      await channel.delete();

      await this.prisma.voiceChannelsTemp.delete({
        where: {
          id: String(oldState.channelId),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

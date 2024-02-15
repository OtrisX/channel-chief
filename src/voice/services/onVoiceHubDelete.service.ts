import { Catch, Injectable } from '@nestjs/common';
import { Context, ContextOf } from 'necord';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OnVoiceHubDelete {
  constructor(private prisma: PrismaService) {}

  async onVoiceHubDelete([channel]: ContextOf<'channelDelete'>) {
    try {
      const hubChannel = await this.prisma.voiceChannelsHub.findUnique({
        where: {
          id: String(channel.id),
        },
      });

      if (!hubChannel) return;

      await this.prisma.voiceChannelsHub.delete({
        where: {
          id: String(channel.id),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

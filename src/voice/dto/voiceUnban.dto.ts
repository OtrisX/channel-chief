import { User } from 'discord.js';
import { UserOption } from 'necord';

export class VoiceUnbanDto {
  @UserOption({
    name: 'user',
    description: 'User to unban from the voice channel',
    required: true,
  })
  user: User;
}

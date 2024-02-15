import { User } from 'discord.js';
import { UserOption } from 'necord';

export class VoiceKickDto {
  @UserOption({
    name: 'user',
    description: 'User to kick from the voice channel',
    required: true,
  })
  user: User;
}

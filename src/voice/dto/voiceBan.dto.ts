import { User } from 'discord.js';
import { UserOption } from 'necord';

export class VoiceBanDto {
  @UserOption({
    name: 'user',
    description: 'User to ban from the voice channel',
    required: true,
  })
  user: User;
}

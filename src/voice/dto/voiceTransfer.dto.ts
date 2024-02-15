import { User } from 'discord.js';
import { UserOption } from 'necord';

export class VoiceTransferDto {
  @UserOption({
    name: 'user',
    description: 'The user to transfer the ownership to',
    required: true,
  })
  user: User;
}

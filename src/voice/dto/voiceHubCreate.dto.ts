import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { StringOption } from 'necord';

export class VoiceHubCreateDto {
  @Length(1, 15)
  @IsNotEmpty()
  @StringOption({
    name: 'name',
    description: 'Name of the voice hub channel',
    required: true,
  })
  name: string;
}

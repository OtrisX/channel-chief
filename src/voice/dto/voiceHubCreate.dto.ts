import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
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

  @IsNumberString()
  @Length(19, 19)
  @IsNotEmpty()
  @StringOption({
    name: 'parentid',
    description: 'ID of the parent category',
    required: true,
  })
  parentId: string;

  @IsNotEmpty()
  @IsString()
  @StringOption({
    name: 'alias',
    description: '[alias] | [voice owner name]',
    required: true,
  })
  tempChannelAlias: string;
}

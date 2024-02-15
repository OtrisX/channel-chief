import { Injectable } from '@nestjs/common';
import { On, Context, ContextOf } from 'necord';
import { OnVoiceHubjoin } from './services/onVoiceHubJoin.service';
import { OnVoiceTempLeft } from './services/onVoiceTempLeft.service';
import { OnVoiceHubDelete } from './services/onVoiceHubDelete.service';

@Injectable()
export class VoiceController {
  constructor(
    private readonly onVoiceHubjoin: OnVoiceHubjoin,
    private readonly onVoiceTempLeft: OnVoiceTempLeft,
    private readonly onVoiceHubDelete: OnVoiceHubDelete,
  ) {}

  @On('voiceStateUpdate')
  public async onJoin(@Context() [oldState, _]: ContextOf<'voiceStateUpdate'>) {
    this.onVoiceHubjoin.onVoicehubJoin([oldState, _]);
  }

  @On('voiceStateUpdate')
  public async onLeave(
    @Context() [oldState, _]: ContextOf<'voiceStateUpdate'>,
  ) {
    this.onVoiceTempLeft.onVoicehubJoin([oldState, _]);
  }

  @On('channelDelete')
  public async onHubDelete(@Context() [channel]: ContextOf<'channelDelete'>) {
    this.onVoiceHubDelete.onVoiceHubDelete([channel]);
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { AvatarEffectDataParser } from './AvatarEffectDataParser';
import { IAvatarEffectData } from './IAvatarEffectData';

type AvatarEffectsMessageType = {
    effects: IAvatarEffectData[];
};

export const AvatarEffectsMessage: IIncomingPacket<AvatarEffectsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvatarEffectsMessageType = {
        effects: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.effects.push(AvatarEffectDataParser(wrapper));

        count--;
    }

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvatarEffectSelectedMessageType = {
    type: number;
};

export const AvatarEffectSelectedMessage: IIncomingPacket<AvatarEffectSelectedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvatarEffectSelectedMessageType = {
        type: wrapper.readInt()
    };

    return packet;
};

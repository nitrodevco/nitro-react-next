import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvatarEffectExpiredMessageType = {
    type: number;
};

export const AvatarEffectExpiredMessage: IIncomingPacket<AvatarEffectExpiredMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvatarEffectExpiredMessageType = {
        type: wrapper.readInt()
    };

    return packet;
};

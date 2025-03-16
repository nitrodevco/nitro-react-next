import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvatarEffectAddedMessageType = {
    type: number;
    subType: number;
    duration: number;
    permanent: boolean;
};

export const AvatarEffectAddedMessage: IIncomingPacket<AvatarEffectAddedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvatarEffectAddedMessageType = {
        type: wrapper.readInt(),
        subType: wrapper.readInt(),
        duration: wrapper.readInt(),
        permanent: wrapper.readBoolean(),
    };

    return packet;
};

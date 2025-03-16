import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvatarEffectActivatedMessageType = {
    type: number;
    duration: number;
    isPermanent: boolean;
};

export const AvatarEffectActivatedMessage: IIncomingPacket<AvatarEffectActivatedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvatarEffectActivatedMessageType = {
        type: wrapper.readInt(),
        duration: wrapper.readInt(),
        isPermanent: wrapper.readBoolean()
    };

    return packet;
};

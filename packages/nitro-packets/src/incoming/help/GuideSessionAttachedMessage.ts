import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionAttachedMessageType = {
    asGuide: boolean;
    helpRequestType: number;
    helpRequestDescription: string;
    roleSpecificWaitTime: number;
};

export const GuideSessionAttachedMessage: IIncomingPacket<GuideSessionAttachedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionAttachedMessageType = {
        asGuide: wrapper.readBoolean(),
        helpRequestType: wrapper.readInt(),
        helpRequestDescription: wrapper.readString(),
        roleSpecificWaitTime: wrapper.readInt()
    };

    return packet;
};

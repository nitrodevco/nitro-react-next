import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ModerationCautionMessageType = {
    message: string;
    url: string;
};

export const ModerationCautionMessage: IIncomingPacket<ModerationCautionMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModerationCautionMessageType = {
        message: wrapper.readString(),
        url: wrapper.readString()
    };

    return packet;
};

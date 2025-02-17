import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CurrentTimingCodeMessageType = {
    schedulingStr: string;
    code: string;
};

export const CurrentTimingCodeMessage: IIncomingPacket<CurrentTimingCodeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CurrentTimingCodeMessageType = {
        schedulingStr: wrapper.readString(),
        code: wrapper.readString(),
    };

    return packet;
};

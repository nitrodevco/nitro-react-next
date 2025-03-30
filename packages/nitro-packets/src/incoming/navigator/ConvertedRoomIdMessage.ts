import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ConvertedRoomIdMessageType = {
    globalId: string;
    convertedId: number;
};

export const ConvertedRoomIdMessage: IIncomingPacket<ConvertedRoomIdMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ConvertedRoomIdMessageType = {
        globalId: wrapper.readString(),
        convertedId: wrapper.readInt()
    };

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelClosedAndOpensMessageType = {
    openHour: number;
    openMinute: number;
};

export const HotelClosedAndOpensMessage: IIncomingPacket<HotelClosedAndOpensMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelClosedAndOpensMessageType = {
        openHour: wrapper.readInt(),
        openMinute: wrapper.readInt()
    };

    return packet;
};

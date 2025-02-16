import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelClosedAndOpensMessageType = {
    openHour: number;
    openMinute: number;
};

export const HotelClosedAndOpensMessage: IIncomingPacket<HotelClosedAndOpensMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelClosedAndOpensMessageType = {
        openHour: 0,
        openMinute: 0
    };

    packet.openHour = wrapper.readInt();
    packet.openMinute = wrapper.readInt();

    return packet;
};

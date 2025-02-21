import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelClosesAndWillOpenAtMessageType = {
    openHour: number;
    openMinute: number;
    userThrownOutAtClose: boolean;
};

export const HotelClosesAndWillOpenAtMessage: IIncomingPacket<HotelClosesAndWillOpenAtMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelClosesAndWillOpenAtMessageType = {
        openHour: wrapper.readInt(),
        openMinute: wrapper.readInt(),
        userThrownOutAtClose: wrapper.readBoolean()
    };

    return packet;
};

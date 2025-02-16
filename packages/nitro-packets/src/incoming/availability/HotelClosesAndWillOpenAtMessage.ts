import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelClosesAndWillOpenAtMessageType = {
    openHour: number;
    openMinute: number;
    userThrownOutAtClose: boolean;
};

export const HotelClosesAndWillOpenAtMessage: IIncomingPacket<HotelClosesAndWillOpenAtMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelClosesAndWillOpenAtMessageType = {
        openHour: 0,
        openMinute: 0,
        userThrownOutAtClose: false
    };

    packet.openHour = wrapper.readInt();
    packet.openMinute = wrapper.readInt();
    packet.userThrownOutAtClose = wrapper.readBoolean();

    return packet;
};

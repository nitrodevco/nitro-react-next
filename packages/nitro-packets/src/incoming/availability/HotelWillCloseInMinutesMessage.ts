import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelWillCloseInMinutesMessageType = {
    minutes: number;
};

export const HotelWillCloseInMinutesMessage: IIncomingPacket<HotelWillCloseInMinutesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelWillCloseInMinutesMessageType = {
        minutes: 0
    };

    packet.minutes = wrapper.readInt();

    return packet;
};

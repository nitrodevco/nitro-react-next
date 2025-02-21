import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelWillCloseInMinutesMessageType = {
    minutes: number;
};

export const HotelWillCloseInMinutesMessage: IIncomingPacket<HotelWillCloseInMinutesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelWillCloseInMinutesMessageType = {
        minutes: wrapper.readInt()
    };

    return packet;
};

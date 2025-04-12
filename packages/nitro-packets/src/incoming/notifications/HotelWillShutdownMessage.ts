import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelWillShutdownMessageType = {
    minutes: number;
};

export const HotelWillShutdownMessage: IIncomingPacket<HotelWillShutdownMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelWillShutdownMessageType = {
        minutes: wrapper.readInt()
    };

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HotelMergeNameChangeMessageType = {
};

export const HotelMergeNameChangeMessage: IIncomingPacket<HotelMergeNameChangeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HotelMergeNameChangeMessageType = {};

    return packet;
};

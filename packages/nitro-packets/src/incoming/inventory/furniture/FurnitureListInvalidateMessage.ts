import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FurnitureListInvalidateMessageType = {
};

export const FurnitureListInvalidateMessage: IIncomingPacket<FurnitureListInvalidateMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FurnitureListInvalidateMessageType = {};

    return packet;
};

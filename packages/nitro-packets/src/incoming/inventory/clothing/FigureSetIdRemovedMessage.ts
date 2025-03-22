import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FigureSetIdRemovedMessageType = {
    itemId: number;
};

export const FigureSetIdRemovedMessage: IIncomingPacket<FigureSetIdRemovedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FigureSetIdRemovedMessageType = {
        itemId: wrapper.readInt()
    };

    return packet;
};

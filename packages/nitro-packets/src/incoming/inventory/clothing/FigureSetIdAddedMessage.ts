import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FigureSetIdAddedMessageType = {
    itemId: number;
};

export const FigureSetIdAddedMessage: IIncomingPacket<FigureSetIdAddedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FigureSetIdAddedMessageType = {
        itemId: wrapper.readInt()
    };

    return packet;
};

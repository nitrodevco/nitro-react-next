import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FavoriteChangedMessageType = {
    flatId: number;
    added: boolean;
};

export const FavoriteChangedMessage: IIncomingPacket<FavoriteChangedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FavoriteChangedMessageType = {
        flatId: wrapper.readInt(),
        added: wrapper.readBoolean()
    };

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FavoritesMessageType = {
    limit: number;
    favoriteRoomIds: number[];
};

export const FavoritesMessage: IIncomingPacket<FavoritesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FavoritesMessageType = {
        limit: wrapper.readInt(),
        favoriteRoomIds: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.favoriteRoomIds.push(wrapper.readInt());

        count--;
    }

    return packet;
};

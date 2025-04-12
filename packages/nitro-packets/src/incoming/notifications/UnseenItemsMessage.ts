import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type UnseenItemsMessageType = {
    items: Record<number, number[]>;
};

export const UnseenItemsMessage: IIncomingPacket<UnseenItemsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UnseenItemsMessageType = {
        items: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        let itemCategory = wrapper.readInt();
        let itemCount = wrapper.readInt();
        let itemIds: number[] = [];

        while (itemCount > 0)
        {
            itemIds.push(wrapper.readInt());

            itemCount--;
        }

        packet.items[itemCategory] = itemIds;

        count--;
    }

    return packet;
};

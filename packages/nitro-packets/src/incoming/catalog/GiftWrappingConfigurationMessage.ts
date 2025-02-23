import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GiftWrappingConfigurationMessageType = {
    isEnabled: boolean;
    price: number;
    giftWrappers: number[];
    boxTypes: number[];
    ribbonTypes: number[];
    giftFurnis: number[];
};

export const GiftWrappingConfigurationMessage: IIncomingPacket<GiftWrappingConfigurationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GiftWrappingConfigurationMessageType = {
        isEnabled: wrapper.readBoolean(),
        price: wrapper.readInt(),
        giftWrappers: [],
        boxTypes: [],
        ribbonTypes: [],
        giftFurnis: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.giftWrappers.push(wrapper.readInt());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.boxTypes.push(wrapper.readInt());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.ribbonTypes.push(wrapper.readInt());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.giftFurnis.push(wrapper.readInt());

        count--;
    }

    return packet;
};

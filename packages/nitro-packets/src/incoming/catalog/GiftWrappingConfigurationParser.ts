import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GiftWrappingConfigurationParserType = {
    isEnabled: boolean;
    price: number;
};

export const GiftWrappingConfigurationParser: IIncomingPacket<GiftWrappingConfigurationParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GiftWrappingConfigurationParserType = {
        boxTypes: null,
        giftFurnis: null,
        giftWrappers: null,
        ribbonTypes: null,
        isEnabled: null,
        price: null,
    };

    packet.isEnabled = wrapper.readBoolean();
    packet.price = wrapper.readInt();

    return packet;
};
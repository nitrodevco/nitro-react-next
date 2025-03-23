import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MarketplaceConfigurationMessageType = {
    enabled: boolean;
    commission: number;
    credits: number;
    advertisements: number;
    minimumPrice: number;
    maximumPrice: number;
    offerTime: number;
    displayTime: number;
};

export const MarketplaceConfigurationMessage: IIncomingPacket<MarketplaceConfigurationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceConfigurationMessageType = {
        enabled: wrapper.readBoolean(),
        commission: wrapper.readInt(),
        credits: wrapper.readInt(),
        advertisements: wrapper.readInt(),
        minimumPrice: wrapper.readInt(),
        maximumPrice: wrapper.readInt(),
        offerTime: wrapper.readInt(),
        displayTime: wrapper.readInt()
    };

    return packet;
};

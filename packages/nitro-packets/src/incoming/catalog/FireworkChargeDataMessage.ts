import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogFireworkChargeDataParser } from './CatalogFireworkChargeDataParser';
import { ICatalogFireworkChargeData } from './ICatalogFireworkChargeData';

type FireworkChargeDataMessageType = {
    fireworkChargeData: ICatalogFireworkChargeData;
};

export const FireworkChargeDataMessage: IIncomingPacket<FireworkChargeDataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FireworkChargeDataMessageType = {
        fireworkChargeData: CatalogFireworkChargeDataParser(wrapper)
    };

    return packet;
};

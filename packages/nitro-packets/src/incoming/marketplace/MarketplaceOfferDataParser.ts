import { GetObjectDataForFlags, IMessageDataWrapper, ObjectDataFlagsEnum, ObjectDataParser } from '@nitrodevco/nitro-shared';
import { IMarketplaceOfferData } from './IMarketplaceOfferData';
import { MarketplaceFurniTypeEnum } from './MarketplaceFurniTypeEnum';

export const MarketplaceOfferDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        offerId: wrapper.readInt(),
        status: wrapper.readInt(),
        furniType: wrapper.readInt() as MarketplaceFurniTypeEnum,
        furniId: wrapper.readInt(),
        extraData: '',
        stuffData: null,
        offerCount: -1
    } as IMarketplaceOfferData;

    if (packet.furniType === MarketplaceFurniTypeEnum.Stuff)
    {
        packet.stuffData = ObjectDataParser(wrapper);
    }

    else if (packet.furniType === MarketplaceFurniTypeEnum.Wall)
    {
        packet.extraData = wrapper.readString();
    }

    else if (packet.furniType === MarketplaceFurniTypeEnum.Unique)
    {
        packet.stuffData = GetObjectDataForFlags(ObjectDataFlagsEnum.Legacy);

        packet.stuffData.uniqueNumber = wrapper.readInt();
        packet.stuffData.uniqueSeries = wrapper.readInt();
        packet.furniType = MarketplaceFurniTypeEnum.Stuff;
    }

    packet.price = wrapper.readInt();
    packet.timeLeftMinutes = wrapper.readInt();
    packet.averagePrice = wrapper.readInt();

    return packet;
}

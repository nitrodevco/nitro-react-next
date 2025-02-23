import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogClubOfferExtendDataParser } from './CatalogClubOfferExtendDataParser';
import { ICatalogClubOfferExtendData } from './ICatalogClubOfferExtendData';

type HabboClubExtendOfferMessageType = {
    offer: ICatalogClubOfferExtendData;
};

export const HabboClubExtendOfferMessage: IIncomingPacket<HabboClubExtendOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboClubExtendOfferMessageType = {
        offer: CatalogClubOfferExtendDataParser(wrapper)
    };

    return packet;
};

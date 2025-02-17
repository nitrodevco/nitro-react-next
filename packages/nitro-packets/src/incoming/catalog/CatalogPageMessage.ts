import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogFrontpageItemDataParser } from './CatalogFrontpageItemDataParser';
import { CatalogLocalizationDataParser } from './CatalogLocalizationDataParser';
import { CatalogOfferDataParser } from './CatalogOfferDataParser';
import { ICatalogFrontpageItemData } from './ICatalogFrontpageItemData';
import { ICatalogLocalizationData } from './ICatalogLocalizationData';
import { ICatalogOfferData } from './ICatalogOfferData';

type CatalogPageMessageType = {
    pageId: number;
    catalogType: string;
    layoutCode: string;
    localization: ICatalogLocalizationData;
    offers: ICatalogOfferData[];
    offerId: number;
    acceptSeasonCurrencyAsCredits: boolean;
    frontPageItems: ICatalogFrontpageItemData[];
};

export const CatalogPageMessage: IIncomingPacket<CatalogPageMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CatalogPageMessageType = {
        pageId: wrapper.readInt(),
        catalogType: wrapper.readString(),
        layoutCode: wrapper.readString(),
        localization: CatalogLocalizationDataParser(wrapper),
        offers: [],
        frontPageItems: []
    } as CatalogPageMessageType;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.offers.push(CatalogOfferDataParser(wrapper));

        count--;
    }

    packet.offerId = wrapper.readInt();
    packet.acceptSeasonCurrencyAsCredits = wrapper.readBoolean();

    if (wrapper.bytesAvailable)
    {
        count = wrapper.readInt();

        while (count > 0)
        {
            packet.frontPageItems.push(CatalogFrontpageItemDataParser(wrapper));

            count--;
        }
    }

    return packet;
};

import { IObjectData } from '@nitrodevco/nitro-shared';
import { MarketplaceFurniTypeEnum } from './MarketplaceFurniTypeEnum';

export interface IMarketplaceOfferData
{
    offerId: number;
    furniId: number;
    furniType: MarketplaceFurniTypeEnum;
    extraData: string;
    stuffData: IObjectData;
    price: number;
    status: number;
    timeLeftMinutes: number;
    averagePrice: number;
    offerCount: number;
}

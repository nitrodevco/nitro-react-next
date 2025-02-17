import { ICatalogOfferProductData } from './ICatalogOfferProductData';

export interface ICatalogOfferData
{
    offerId: number;
    localizationId: string;
    rent: boolean;
    priceCredits: number;
    priceActivityPoints: number;
    priceActivityPointsType: number;
    clubLevel: number;
    giftable: boolean;
    bundlePurchaseAllowed: boolean;
    isPet: boolean;
    previewImage: string;
    products: ICatalogOfferProductData[];
}

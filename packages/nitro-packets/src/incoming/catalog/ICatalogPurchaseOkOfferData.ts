import { ICatalogProductData } from './ICatalogProductData';

export interface ICatalogPurchaseOkOfferData
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
    products: ICatalogProductData[];
}

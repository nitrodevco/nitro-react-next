import { ICatalogPage } from './ICatalogPage';
import { IProduct } from './IProduct';

export interface IPurchasableOffer
{
    // Basic Identifiers
    offerId: number;
    localizationId: string;
    localizationName?: string;
    localizationDescription?: string;

    // Pricing Information
    priceInCredits: number;
    priceInActivityPoints: number;
    activityPointType: number;
    pricingModel: string;
    priceType: string;

    // Product Details
    product: IProduct;
    products: IProduct[];

    // Membership and Permissions
    clubLevel: number;
    giftable: boolean;
    bundlePurchaseAllowed: boolean;

    // Offer Type
    isRentOffer: boolean;
    isLazy: boolean;

    // Page Context
    page: ICatalogPage;

    // Other
    badgeCode: string;
}

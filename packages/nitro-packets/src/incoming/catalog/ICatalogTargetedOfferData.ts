export interface ICatalogTargetedOfferData
{
    id: number;
    identifier: string;
    type: number;
    title: string;
    description: string;
    imageUrl: string;
    iconImageUrl: string;
    productCode: string;
    purchaseLimit: number;
    expirationTime: number;
    priceInCredits: number;
    priceInActivityPoints: number;
    activityPointType: number;
    subProductCodes: string[];
    trackingState: number;
}

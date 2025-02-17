import { CatalogFrontpageItemTypeEnum } from './CatalogFrontpageItemTypeEnum';

export interface ICatalogFrontpageItemData
{
    type: CatalogFrontpageItemTypeEnum;
    position: number;
    itemName: string;
    itemPromoImage: string;
    catalogPageLocation: string;
    productCode: string;
    productOfferId: number;
    expirationTime: number;
}

import { CatalogProductTypeEnum } from './CatalogProductTypeEnum';

export interface ICatalogOfferProductData
{
    productType: CatalogProductTypeEnum;
    furniClassId: number;
    extraParam: string;
    productCount: number;
    uniqueLimitedItem: boolean;
    uniqueLimitedItemSeriesSize: number;
    uniqueLimitedItemsLeft: number;
}

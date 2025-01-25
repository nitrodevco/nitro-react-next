import { IFurnitureData, IProductData } from '@nitrots/nitro-renderer';

export interface IProduct
{
    productType: string;
    productClassId: number;
    extraParam: string;
    productCount: number;
    productData: IProductData;
    furnitureData: IFurnitureData;
    isUniqueLimitedItem: boolean;
    uniqueLimitedItemSeriesSize: number;
    uniqueLimitedItemsLeft: number;
}

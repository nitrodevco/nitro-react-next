import { IFurnitureData } from '@nitrodevco/nitro-renderer';

export interface IProduct
{
    productType: string;
    productClassId: number;
    extraParam: string;
    productCount: number;
    furnitureData: IFurnitureData;
    isUniqueLimitedItem: boolean;
    uniqueLimitedItemSeriesSize: number;
    uniqueLimitedItemsLeft: number;
}

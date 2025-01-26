import { ProductType } from '#base/api';
import { GetSessionDataManager, IFurnitureData } from '@nitrots/nitro-renderer';

export function GetFurnitureData(furniClassId: number, productType: string): IFurnitureData
{
    let furniData: IFurnitureData = null;

    switch (productType.toLowerCase())
    {
        case ProductType.FLOOR:
            furniData = GetSessionDataManager().getFloorItemData(furniClassId);
            break;
        case ProductType.WALL:
            furniData = GetSessionDataManager().getWallItemData(furniClassId);
            break;
    }

    return furniData;
}

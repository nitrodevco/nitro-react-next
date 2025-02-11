import { GetSessionDataManager, IFurnitureData } from '@nitrodevco/nitro-renderer';
import { ProductTypeEnum } from '../../catalog';

export function GetFurnitureData(furniClassId: number, productType: string): IFurnitureData
{
    let furniData: IFurnitureData = null;

    switch (productType.toLowerCase())
    {
        case ProductTypeEnum.Floor:
            furniData = GetSessionDataManager().getFloorItemData(furniClassId);
            break;
        case ProductTypeEnum.Wall:
            furniData = GetSessionDataManager().getWallItemData(furniClassId);
            break;
    }

    return furniData;
}

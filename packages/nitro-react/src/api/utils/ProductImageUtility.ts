import { FurnitureType, GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { FurniCategoryEnum } from '../inventory';

export class ProductImageUtility
{
    public static getProductImageUrl(productType: FurnitureType, furniClassId: number, extraParam: string): string
    {
        let imageUrl: string = null;

        switch (productType)
        {
            case FurnitureType.FLOOR:
                imageUrl = GetRoomEngine().getFurnitureFloorIconUrl(furniClassId);
                break;
            case FurnitureType.WALL: {
                const productCategory = this.getProductCategory(FurnitureType.WALL, furniClassId);

                if (productCategory === FurniCategoryEnum.Default)
                {
                    imageUrl = GetRoomEngine().getFurnitureWallIconUrl(furniClassId, extraParam);
                }
                else
                {
                    switch (productCategory)
                    {
                        case FurniCategoryEnum.Wallpaper:
                            break;
                        case FurniCategoryEnum.Landscape:
                            break;
                        case FurniCategoryEnum.Floor:
                            break;
                    }
                }
                break;
            }
            case FurnitureType.EFFECT:
                // fx_icon_furniClassId_png
                break;
        }

        return imageUrl;
    }

    public static getProductCategory(productType: FurnitureType, furniClassId: number): FurniCategoryEnum
    {
        if (productType === FurnitureType.WALL)
        {
            if (furniClassId === 3001) return FurniCategoryEnum.Wallpaper;

            if (furniClassId === 3002) return FurniCategoryEnum.Floor;

            if (furniClassId === 4057) return FurniCategoryEnum.Landscape;
        }

        return FurniCategoryEnum.Default;
    }
}

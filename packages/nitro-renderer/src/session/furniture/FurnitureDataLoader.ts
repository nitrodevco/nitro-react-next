import { FurnitureType, IFurnitureData } from '#renderer/api';
import { GetConfigValue, LocalizationStore } from '@nitrodevco/nitro-shared';
import { FurnitureData } from './FurnitureData';

export class FurnitureDataLoader
{
    private _floorItems: Map<number, IFurnitureData>;
    private _wallItems: Map<number, IFurnitureData>;

    constructor(floorItems: Map<number, IFurnitureData>, wallItems: Map<number, IFurnitureData>)
    {
        this._floorItems = floorItems;
        this._wallItems = wallItems;
    }

    public async init(): Promise<void>
    {
        const url = GetConfigValue<string>('gamedata.urls.furniData', '');

        if (!url || !url.length) throw new Error('invalid furni data url');

        const response = await fetch(url);

        if (response.status !== 200) throw new Error('Invalid furni data file');

        const responseData = await response.json();

        if (responseData.roomitemtypes) this.parseFloorItems(responseData.roomitemtypes);

        if (responseData.wallitemtypes) this.parseWallItems(responseData.wallitemtypes);

        this.updateLocalizations([...this._floorItems.values(), ...this._wallItems.values()]);
    }

    private parseFloorItems(data: any): void
    {
        if (!data || !data.furnitype) return;

        for (const furniture of data.furnitype)
        {
            if (!furniture) continue;

            const colors: number[] = [];

            if (furniture.partcolors)
            {
                for (const color of furniture.partcolors.color)
                {
                    let colorCode = (color as string);

                    if (colorCode.charAt(0) === '#')
                    {
                        colorCode = colorCode.replace('#', '');

                        colors.push(parseInt(colorCode, 16));
                    }
                    else
                    {
                        colors.push((parseInt(colorCode, 16)));
                    }
                }
            }

            const classSplit = (furniture.classname as string).split('*');
            const className = classSplit[0];
            const colorIndex = ((classSplit.length > 1) ? parseInt(classSplit[1]) : 0);
            const hasColorIndex = (classSplit.length > 1);

            const furnitureData = new FurnitureData(FurnitureType.FLOOR, furniture.id, furniture.classname, className, furniture.category, furniture.name, furniture.description, furniture.revision, furniture.xdim, furniture.ydim, 0, colors, hasColorIndex, colorIndex, furniture.adurl, furniture.offerid, furniture.buyout, furniture.rentofferid, furniture.rentbuyout, furniture.bc, furniture.customparams, furniture.specialtype, furniture.canstandon, furniture.cansiton, furniture.canlayon, furniture.excludeddynamic, furniture.furniline, furniture.environment, furniture.rare);

            this._floorItems.set(furnitureData.id, furnitureData);
        }
    }

    private parseWallItems(data: any): void
    {
        if (!data || !data.furnitype) return;

        for (const furniture of data.furnitype)
        {
            if (!furniture) continue;

            const furnitureData = new FurnitureData(FurnitureType.WALL, furniture.id, furniture.classname, furniture.classname, furniture.category, furniture.name, furniture.description, furniture.revision, 0, 0, 0, null, false, 0, furniture.adurl, furniture.offerid, furniture.buyout, furniture.rentofferid, furniture.rentbuyout, furniture.bc, null, furniture.specialtype, false, false, false, furniture.excludeddynamic, furniture.furniline, furniture.environment, furniture.rare);

            this._wallItems.set(furnitureData.id, furnitureData);
        }
    }

    private updateLocalizations(furnitureDatas: IFurnitureData[]): void
    {
        const localizations: Record<string, string> = {};

        furnitureDatas.forEach(furnitureData =>
        {
            if (furnitureData.type === FurnitureType.FLOOR)
            {
                localizations['roomItem.name.' + furnitureData.id] = furnitureData.name;
                localizations['roomItem.desc.' + furnitureData.id] = furnitureData.description;
            }

            else if (furnitureData.type === FurnitureType.WALL)
            {
                localizations['wallItem.name.' + furnitureData.id] = furnitureData.name;
                localizations['wallItem.desc.' + furnitureData.id] = furnitureData.description;
            }
        });

        LocalizationStore.getState().setLocalization(localizations);
    }
}

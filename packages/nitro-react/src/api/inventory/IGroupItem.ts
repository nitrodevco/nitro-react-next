import { IObjectData } from '@nitrodevco/nitro-renderer';
import { FurnitureItem } from './FurnitureItem';

export interface IGroupItem
{
    type: number;
    category: number;
    stuffData: IObjectData;
    extra: number;
    iconUrl: string;
    name: string;
    description: string;
    hasUnseenItems: boolean;
    locked: boolean;
    selected: boolean;
    isWallItem: boolean;
    isGroupable: boolean;
    isSellable: boolean;
    items: FurnitureItem[];
}

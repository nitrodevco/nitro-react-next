import { GetSessionDataManager, IObjectData, ItemDataStructure, StringDataType } from '@nitrodevco/nitro-renderer';
import { FurniCategoryEnum } from './FurniCategoryEnum';
import { FurnitureItem } from './FurnitureItem';
import { IGroupItem } from './IGroupItem';
import { PushItemIntoGroup } from './InventoryUtils';

const isExternalImage = (spriteId: number) => GetSessionDataManager().getWallItemData(spriteId)?.isExternalImage || false;

export const ParseTradeItems = (items: ItemDataStructure[]) =>
{
    const groupItems = new Map<string, IGroupItem>();
    const totalItems = items.length;

    if (totalItems)
    {
        for (const item of items)
        {
            const spriteId = item.spriteId;
            const category = item.category;

            let name = (item.furniType + spriteId);

            if (!item.isGroupable || isExternalImage(spriteId)) name = ('itemid' + item.itemId);

            if (item.category === FurniCategoryEnum.Poster) name = (item.itemId + 'poster' + item.stuffData.getLegacyString());

            else if (item.category === FurniCategoryEnum.GuildFurni) name = '';

            let groupItem = ((item.isGroupable && !isExternalImage(item.spriteId)) ? groupItems.get(name) : null);

            if (!groupItem)
            {
                groupItem = {
                    type: spriteId,
                    category: category,
                    stuffData: item.stuffData,
                    extra: item.extra ?? null,
                    iconUrl: '',
                    name: '',
                    description: '',
                    hasUnseenItems: false,
                    locked: false,
                    selected: false,
                    isWallItem: false,
                    isGroupable: false,
                    isSellable: false,
                    items: []
                };

                groupItems.set(name, groupItem);
            }

            PushItemIntoGroup(groupItem, new FurnitureItem(item));
        }
    }

    return groupItems;
};

export const GetGuildFurniType = (spriteId: number, stuffData: IObjectData) =>
{
    let type = spriteId.toString();

    if (!(stuffData instanceof StringDataType)) return type;

    let i = 1;

    while (i < 5)
    {
        type = (type + (',' + stuffData.getValue(i)));

        i++;
    }

    return type;
};

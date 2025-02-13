import { FurniturePlacePaintComposer, GetRoomEngine, GetRoomSessionManager, RoomObjectCategory, RoomObjectPlacementSource, RoomObjectType } from '@nitrodevco/nitro-renderer';
import { SendMessageComposer } from '../renderer';
import { FurniCategoryEnum } from './FurniCategoryEnum';
import { FurnitureItem } from './FurnitureItem';
import { IBotItem } from './IBotItem';
import { IGroupItem } from './IGroupItem';
import { IPetItem } from './IPetItem';

let objectMoverRequested = false;
let itemIdInPlacing = -1;

export const IsObjectMoverRequested = () => objectMoverRequested;

export const SetObjectMoverRequested = (flag: boolean) => objectMoverRequested = flag;

export const GetPlacingItemId = () => itemIdInPlacing;

export const SetPlacingItemId = (id: number) => (itemIdInPlacing = id);

export const CancelRoomObjectPlacement = () =>
{
    if (GetPlacingItemId() === -1) return;

    GetRoomEngine().cancelRoomObjectPlacement();

    SetPlacingItemId(-1);
    SetObjectMoverRequested(false);
};

export const AttemptItemPlacement = (groupItem: IGroupItem, dontPlacePaint: boolean = false) =>
{
    if (!groupItem || !GetUnlockedCountForGroup(groupItem)) return false;

    const item = GetLastItemForGroup(groupItem);

    if (!item) return false;

    if ((item.category === FurniCategoryEnum.Floor) || (item.category === FurniCategoryEnum.Wallpaper) || (item.category === FurniCategoryEnum.Landscape))
    {
        if (dontPlacePaint) return false;

        SendMessageComposer(new FurniturePlacePaintComposer(item.id));

        return false;
    }
    else
    {
        let category = 0;
        let isMoving = false;

        if (item.isWallItem) category = RoomObjectCategory.WALL;
        else category = RoomObjectCategory.FLOOR;

        if ((item.category === FurniCategoryEnum.Poster)) // or external image from furnidata
        {
            isMoving = GetRoomEngine().processRoomObjectPlacement(RoomObjectPlacementSource.INVENTORY, item.id, category, item.type, item.stuffData.getLegacyString());
        }
        else
        {
            isMoving = GetRoomEngine().processRoomObjectPlacement(RoomObjectPlacementSource.INVENTORY, item.id, category, item.type, item.extra.toString(), item.stuffData);
        }

        if (isMoving)
        {
            SetPlacingItemId(item.ref);
            SetObjectMoverRequested(true);
        }
    }

    return true;
};

export const AttemptPetPlacement = (petItem: IPetItem, flag: boolean = false) =>
{
    const petData = petItem.petData;

    if (!petData) return false;

    const session = GetRoomSessionManager().getSession(1);

    if (!session || (!session.isRoomOwner && !session.allowPets)) return false;

    if (GetRoomEngine().processRoomObjectPlacement(RoomObjectPlacementSource.INVENTORY, -(petData.id), RoomObjectCategory.UNIT, RoomObjectType.PET, petData.figureData.figuredata))
    {
        SetPlacingItemId(petData.id);
        SetObjectMoverRequested(true);
    }

    return true;
};

export const AttemptBotPlacement = (botItem: IBotItem, flag: boolean = false) =>
{
    const botData = botItem.botData;

    if (!botData) return false;

    const session = GetRoomSessionManager().getSession(1);

    if (!session || !session.isRoomOwner) return false;

    if (GetRoomEngine().processRoomObjectPlacement(RoomObjectPlacementSource.INVENTORY, -(botData.id), RoomObjectCategory.UNIT, RoomObjectType.RENTABLE_BOT, botData.figure))
    {
        SetPlacingItemId(botData.id);
        SetObjectMoverRequested(true);
    }

    return true;
};

const GetItemByIdForGroup = (groupItem: IGroupItem, itemId: number) =>
{
    if (!groupItem || !groupItem.items || !groupItem.items.length || itemId < 0) return null;

    for (const item of groupItem.items)
    {
        if (item.id !== itemId) continue;

        return item;
    }

    return null;
}

export const GetUnlockedCountForGroup = (groupItem: IGroupItem) =>
{
    if (!groupItem) return 0;

    if (groupItem.category === FurniCategoryEnum.Postit) return GetTotalCountForGroup(groupItem);

    let count = 0;
    let i = 0;

    while (i < groupItem.items.length)
    {
        const item = groupItem.items[i];

        if (!item.locked) count++;

        i++;
    }

    return count;
}

const GetLastItemForGroup = (groupItem: IGroupItem) =>
{
    if (!groupItem || !groupItem.items || !groupItem.items.length) return null;

    return groupItem.items[(groupItem.items.length - 1)];
}

export const GetTotalCountForGroup = (groupItem: IGroupItem) =>
{
    if (!groupItem) return 0;

    if (groupItem.category === FurniCategoryEnum.Postit)
    {
        let count = 0;
        let index = 0;

        while (index < groupItem.items.length)
        {
            const item = groupItem.items[index];

            count = (count + parseInt(item.stuffData.getLegacyString()));

            index++;
        }

        return count;
    }

    return groupItem.items.length;
}

export const GetAllItemIdsForGroups = (groupItems: IGroupItem[]) =>
{
    const itemIds: number[] = [];

    for (const groupItem of groupItems)
    {
        let totalCount = GetTotalCountForGroup(groupItem);

        if (groupItem.category === FurniCategoryEnum.Postit) totalCount = 1;

        let i = 0;

        while (i < totalCount)
        {
            itemIds.push(groupItem.items[i]?.id);

            i++;
        }
    }

    return itemIds;
};

export const PushItemIntoGroup = (groupItem: IGroupItem, item: FurnitureItem) =>
{
    if (!groupItem || !item) return;

    const items = [...groupItem.items];

    let i = 0;

    while (i < items.length)
    {
        let existingItem = items[i];

        if (existingItem.id === item.id)
        {
            existingItem = existingItem.clone();

            existingItem.locked = false;

            items.splice(i, 1);

            items.push(existingItem);

            groupItem.items = items;

            return;
        }

        i++;
    }

    items.push(item);

    groupItem.items = items;
    groupItem.isWallItem = items[0].isWallItem;
    groupItem.isGroupable = items[0].isGroupable;
    groupItem.isSellable = items[0].sellable;

    if (groupItem.items.length === 1)
    {
        groupItem.iconUrl = groupItem.isWallItem ? GetRoomEngine().getFurnitureWallIconUrl(groupItem.type, groupItem.stuffData.getLegacyString()) : GetRoomEngine().getFurnitureFloorIconUrl(groupItem.type);
    }
}

const PopItemOutOfGroup = (groupItem: IGroupItem) =>
{
    if (!groupItem || !groupItem.items || !groupItem.items.length) return null;

    const items = [...groupItem.items];

    let item: FurnitureItem = null;

    if (items.length > 0)
    {
        const index = (items.length - 1);

        item = items[index];

        items.splice(index, 1);
    }

    groupItem.items = items;

    return item;
}

export const RemoveItemIdFromGroup = (groupItem: IGroupItem, itemId: number) =>
{
    if (!groupItem || !groupItem.items || !groupItem.items.length || itemId < 0) return null;

    const items = [...groupItem.items];

    let i = 0;

    while (i < items.length)
    {
        let existingItem = items[i];

        if (existingItem.id === itemId)
        {
            items.splice(i, 1);

            groupItem.items = items;

            return existingItem;
        }

        i++;
    }

    return null;
}

export const RemovePetIdFromGroup = (groupItem: IPetItem[], petId: number) =>
{
    let index = 0;

    while (index < groupItem.length)
    {
        const petItem = groupItem[index];

        if (petItem && (petItem.petData.id === petId))
        {
            if (GetPlacingItemId() === petItem.petData.id)
            {
                CancelRoomObjectPlacement();

                //useVisibilityStore.setState({ inventoryVisible: true });
            }

            groupItem.splice(index, 1);

            return petItem;
        }

        index++;
    }

    return null;
};

export const RemoveBotIdFromGroup = (groupItem: IBotItem[], botId: number) =>
{
    let index = 0;

    while (index < groupItem.length)
    {
        const botItem = groupItem[index];

        if (botItem && (botItem.botData.id === botId))
        {
            if (GetPlacingItemId() === botItem.botData.id)
            {
                CancelRoomObjectPlacement();

                //useVisibilityStore.setState({ inventoryVisible: true });
            }

            groupItem.splice(index, 1);

            return botItem;
        }

        index++;
    }

    return null;
};

export const MergeFragments = <T>(fragment: Map<number, T>, totalFragments: number, fragmentNumber: number, fragments: Map<number, T>[]) =>
{
    if (totalFragments === 1) return fragment;

    fragments[fragmentNumber] = fragment;

    for (const frag of fragments)
    {
        if (!frag) return null;
    }

    const merged: Map<number, T> = new Map();

    for (const frag of fragments)
    {
        for (const [key, value] of frag) merged.set(key, value);

        frag.clear();
    }

    fragments = null;

    return merged;
};

const AddSingleFurnitureItem = (set: IGroupItem[], item: FurnitureItem, unseen: boolean) =>
{
    const groupItems: IGroupItem[] = [];

    for (const groupItem of set)
    {
        if (groupItem.type === item.type) groupItems.push(groupItem);
    }

    for (const groupItem of groupItems)
    {
        if (GetItemByIdForGroup(groupItem, item.id)) return groupItem;
    }

    const groupItem: IGroupItem = {
        type: item.type,
        category: item.category,
        stuffData: item.stuffData,
        extra: item.extra,
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

    PushItemIntoGroup(groupItem, item);

    if (unseen)
    {
        groupItem.hasUnseenItems = true;

        set.unshift(groupItem);
    }
    else
    {
        set.push(groupItem);
    }

    return groupItem;
};

const AddGroupableFurnitureItem = (set: IGroupItem[], item: FurnitureItem, unseen: boolean) =>
{
    let existingGroup: IGroupItem = null;

    for (const groupItem of set)
    {
        if ((groupItem.type === item.type) && (groupItem.isWallItem === item.isWallItem) && groupItem.isGroupable)
        {
            if (item.category === FurniCategoryEnum.Poster)
            {
                if (groupItem.stuffData.getLegacyString() === item.stuffData.getLegacyString())
                {
                    existingGroup = groupItem;

                    break;
                }
            }

            else if (item.category === FurniCategoryEnum.GuildFurni)
            {
                if (item.stuffData.compare(groupItem.stuffData))
                {
                    existingGroup = groupItem;

                    break;
                }
            }

            else
            {
                existingGroup = groupItem;

                break;
            }
        }
    }

    if (existingGroup)
    {
        PushItemIntoGroup(existingGroup, item);

        if (unseen)
        {
            existingGroup.hasUnseenItems = true;

            const index = set.indexOf(existingGroup);

            if (index >= 0) set.splice(index, 1);

            set.unshift(existingGroup);
        }

        return existingGroup;
    }

    existingGroup = {
        type: item.type,
        category: item.category,
        stuffData: item.stuffData,
        extra: item.extra,
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

    PushItemIntoGroup(existingGroup, item);

    if (unseen)
    {
        existingGroup.hasUnseenItems = true;

        set.unshift(existingGroup);
    }
    else
    {
        set.push(existingGroup);
    }

    return existingGroup;
};

export const AddFurnitureItem = (set: IGroupItem[], item: FurnitureItem, unseen: boolean) =>
{
    if (!item.isGroupable)
    {
        AddSingleFurnitureItem(set, item, unseen);
    }
    else
    {
        AddGroupableFurnitureItem(set, item, unseen);
    }
};

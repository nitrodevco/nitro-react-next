import { AddFurnitureItem, AttemptItemPlacement, CancelRoomObjectPlacement, FurnitureItem, GetAllItemIdsForGroups, GetPlacingItemId, GetTotalCountForGroup, IGroupItem, RemoveItemIdFromGroup, UnseenItemCategoryEnum } from '#base/api';
import { useVisibilityStore } from '#base/stores';
import { FurnitureListItemParser } from '@nitrodevco/nitro-renderer';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryFurniSlice
{
    furniItems: IGroupItem[];
    selectedFurniItem: IGroupItem;
    furniSearchValue: string;
    furniNeedsUpdate: boolean;
    selectFurniItem: (selectedFurniItem?: IGroupItem, furniItems?: IGroupItem[]) => void;
    setFurniSearchValue: (searchValue: string) => void;
    addOrUpdateFurniItems: (items: FurnitureListItemParser[]) => void;
    processFurniItems: (items: Map<number, FurnitureListItemParser>) => void;
    removeFurniItem: (itemId: number) => void;
    setFurniNeedsUpdate: (flag: boolean) => void;
}

export const createInventoryFurniSlice: StateCreator<
    InventoryFurniSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryFurniSlice
> = set =>
    ({
        furniItems: [],
        selectedFurniItem: null,
        furniSearchValue: '',
        furniNeedsUpdate: true,
        selectFurniItem: (selectedFurniItem: IGroupItem = null, furniItems: IGroupItem[] = null) => set(state =>
        {
            selectedFurniItem = !selectedFurniItem ? state.selectedFurniItem : selectedFurniItem;

            furniItems = furniItems ?? state.furniItems;

            if (furniItems.length)
            {
                if (selectedFurniItem && furniItems.indexOf(selectedFurniItem) === -1) selectedFurniItem = null;

                if (!selectedFurniItem) selectedFurniItem = furniItems[0];
            }

            if (selectedFurniItem && selectedFurniItem.hasUnseenItems)
            {
                selectedFurniItem.hasUnseenItems = false;

                state.resetUnseenItems(UnseenItemCategoryEnum.Furni, selectedFurniItem.items.map(item => item.id));
            }

            return { selectedFurniItem };
        }),
        setFurniSearchValue: (searchValue: string) => set({ furniSearchValue: searchValue }),
        addOrUpdateFurniItems: (items: FurnitureListItemParser[]) => set(state =>
        {
            if (!items || !items.length) return state;

            const groupItems = [...state.furniItems];

            for (const item of items)
            {
                let i = 0;
                let groupItem: IGroupItem = null;

                while (i < groupItems.length)
                {
                    const group = groupItems[i];

                    let j = 0;

                    while (j < group.items.length)
                    {
                        const furniture = group.items[j];

                        if (furniture.id === item.itemId)
                        {
                            furniture.update(item);

                            const newFurniture = [...group.items];

                            newFurniture[j] = furniture;

                            group.items = newFurniture;

                            groupItem = group;

                            break;
                        }

                        j++;
                    }

                    if (groupItem) break;

                    i++;
                }

                if (groupItem)
                {
                    groupItems[groupItems.indexOf(groupItem)] = { ...groupItem, hasUnseenItems: true };
                }
                else
                {
                    const furniture = new FurnitureItem(item);

                    AddFurnitureItem(groupItems, furniture, (state.unseenItems.get(UnseenItemCategoryEnum.Furni)?.indexOf(item.itemId) >= 0));

                    // TODO DispatchUiEvent(new InventoryFurniAddedEvent(furniture.id, furniture.type, furniture.category));
                }
            }

            return { furniItems: groupItems };
        }),
        processFurniItems: (items: Map<number, FurnitureListItemParser>) => set(state =>
        {
            const groupItems = [...state.furniItems];
            const existingIds = GetAllItemIdsForGroups(groupItems);

            for (const existingId of existingIds)
            {
                if (items.get(existingId)) continue;

                let i = 0;

                while (i < groupItems.length)
                {
                    const group = groupItems[i];
                    const item = RemoveItemIdFromGroup(group, existingId);

                    if (!item)
                    {
                        i++;

                        continue;
                    }

                    if (GetPlacingItemId() === item.ref)
                    {
                        CancelRoomObjectPlacement();

                        if (!AttemptItemPlacement(group))
                        {
                            useVisibilityStore.setState({ inventoryVisible: true });
                        }
                    }

                    if (GetTotalCountForGroup(group) <= 0) groupItems.splice(i, 1);

                    break;
                }
            }

            for (const itemId of items.keys())
            {
                if (existingIds.indexOf(itemId) >= 0) continue;

                const parser = items.get(itemId);

                if (!parser) continue;

                const item = new FurnitureItem(parser);

                AddFurnitureItem(groupItems, item, (state.unseenItems.get(UnseenItemCategoryEnum.Furni)?.indexOf(itemId) >= 0));

                // TODO DispatchUiEvent(new InventoryFurniAddedEvent(item.id, item.type, item.category));
            }

            return { furniItems: groupItems };
        }),
        removeFurniItem: (itemId: number) => set(state =>
        {
            const groupItems = [...state.furniItems];

            let index = 0;

            while (index < groupItems.length)
            {
                const group = groupItems[index];
                const item = RemoveItemIdFromGroup(group, itemId);

                if (!item)
                {
                    index++;

                    continue;
                }

                if (GetPlacingItemId() === item.ref)
                {
                    CancelRoomObjectPlacement();

                    if (!AttemptItemPlacement(group))
                    {
                        useVisibilityStore.setState({ inventoryVisible: true });
                    }
                }

                if (GetTotalCountForGroup(group) <= 0) groupItems.splice(index, 1);

                break;
            }

            return { furniItems: groupItems };
        }),
        setFurniNeedsUpdate: (flag: boolean) => set({ furniNeedsUpdate: flag }),
    });

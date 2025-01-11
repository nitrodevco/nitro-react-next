import { SendMessageComposer } from '#base/api';
import { UnseenResetCategoryComposer, UnseenResetItemsComposer } from '@nitrots/nitro-renderer';
import { StateCreator } from 'zustand';

export interface InventoryUnseenSlice
{
    unseenItems: Map<number, number[]>;
    getCount: (category: number) => number;
    getFullCount: () => number;
    resetCategory: (category: number) => boolean;
    resetItems: (category: number, items: number[]) => boolean;
    isUnseen: (category: number, itemId: number) => boolean;
    removeUnseen: (category: number, itemId: number) => void;
}

export const createInventoryUnseenSlice: StateCreator<InventoryUnseenSlice> = (set, get) =>
({
    unseenItems: new Map(),
    getCount: (category: number) =>
    {
        return get().unseenItems.get(category)?.length || 0;
    },
    getFullCount: () =>
    {
        let count = 0;

        for (const key of get().unseenItems.keys()) count += get().getCount(key);

        return count;
    },
    resetCategory: (category: number) =>
    {
        let didReset = true;

        set(state =>
        {
            if (!state.unseenItems.has(category))
            {
                didReset = false;

                return state;
            }

            const unseenItems = new Map(state.unseenItems);

            unseenItems.delete(category);

            SendMessageComposer(new UnseenResetCategoryComposer(category));

            return { unseenItems };
        });

        return didReset;
    },
    resetItems: (category: number, itemIds: number[]) =>
    {
        let didReset = true;

        set(state =>
        {
            if (!state.unseenItems.has(category))
            {
                didReset = false;

                return state;
            }

            const unseenItems = new Map(state.unseenItems);
            const unseen = unseenItems.get(category);

            if (!unseen || !unseen.length) return state;

            const newUnseen = unseen.filter(itemId => !itemIds.includes(itemId));

            if (!newUnseen.length) unseenItems.delete(category);
            else unseenItems.set(category, newUnseen);

            SendMessageComposer(new UnseenResetItemsComposer(category, ...itemIds));

            return { unseenItems };
        });

        return didReset;
    },
    isUnseen: (category: number, itemId: number) =>
    {
        const unseenItems = get().unseenItems;

        if (!unseenItems.has(category)) return false;

        return unseenItems.get(category)?.indexOf(itemId) >= 0;
    },
    removeUnseen: (category: number, itemId: number) => set(state =>
    {
        if (!state.unseenItems.has(category)) return state;

        const unseenItems = new Map(state.unseenItems);
        const items = unseenItems.get(category);
        const index = items.indexOf(itemId);

        if (index >= 0) items.splice(index, 1);

        return { unseenItems };
    })
});

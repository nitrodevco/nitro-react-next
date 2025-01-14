import { SendMessageComposer } from '#base/api';
import { UnseenItemsParser, UnseenResetCategoryComposer, UnseenResetItemsComposer } from '@nitrots/nitro-renderer';
import { StateCreator } from 'zustand';

export interface InventoryUnseenSlice
{
    unseenItems: Map<number, number[]>;
    processUnseenItems: (items: UnseenItemsParser) => void;
    getUnseenCount: (category: number) => number;
    getUnseenFullCount: () => number;
    resetUnseenCategory: (category: number) => boolean;
    resetUnseenItems: (category: number, items: number[]) => boolean;
    isUnseen: (category: number, itemId: number) => boolean;
    removeUnseen: (category: number, itemId: number) => void;
}

export const createInventoryUnseenSlice: StateCreator<InventoryUnseenSlice> = (set, get) =>
({
    unseenItems: new Map(),
    processUnseenItems: (items: UnseenItemsParser) => set(state =>
    {
        const unseenItems = new Map(state.unseenItems);

        for (const category of items.categories)
        {
            const itemIds = unseenItems.get(category) ?? [];
            const newItemIds = items.getItemsByCategory(category);

            for (const itemId of newItemIds) itemIds.push(itemId);

            unseenItems.set(category, itemIds);
        }

        return { unseenItems };
    }),
    getUnseenCount: (category: number) =>
    {
        return get().unseenItems.get(category)?.length || 0;
    },
    getUnseenFullCount: () =>
    {
        let count = 0;

        for (const key of get().unseenItems.keys()) count += get().getUnseenCount(key);

        return count;
    },
    resetUnseenCategory: (category: number) =>
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
    resetUnseenItems: (category: number, itemIds: number[]) =>
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

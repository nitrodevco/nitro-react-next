import { SendMessageComposer, UnseenItemCategoryEnum } from '#base/api';
import { UnseenItemsParser, UnseenResetCategoryComposer, UnseenResetItemsComposer } from '@nitrodevco/nitro-renderer';
import { StateCreator } from 'zustand';

export interface InventoryUnseenSlice
{
    unseenItems: Map<UnseenItemCategoryEnum, number[]>;
    processUnseenItems: (items: UnseenItemsParser) => void;
    resetUnseenCategory: (category: UnseenItemCategoryEnum) => boolean;
    resetUnseenItems: (category: UnseenItemCategoryEnum, items: number[]) => boolean;
    removeUnseenItems: (category: UnseenItemCategoryEnum, ...itemIds: number[]) => void;
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
    resetUnseenCategory: (category: UnseenItemCategoryEnum) =>
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
    resetUnseenItems: (category: UnseenItemCategoryEnum, itemIds: number[]) =>
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
    removeUnseenItems: (category: UnseenItemCategoryEnum, ...itemIds: number[]) => set(state =>
    {
        if (!state.unseenItems.has(category)) return state;

        if (!Array.isArray) itemIds = [...itemIds];

        const unseenItems = new Map(state.unseenItems);
        const existingItemIds = unseenItems.get(category);

        let hasChanges = false;

        for (const itemId of itemIds)
        {
            const index = existingItemIds.indexOf(itemId);

            if (index === -1) continue;

            existingItemIds.splice(index, 1);

            hasChanges = true;
        }

        return hasChanges ? { unseenItems } : state;
    })
});

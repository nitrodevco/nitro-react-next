import { CancelRoomObjectPlacement, GetPlacingItemId, IBotItem, RemoveBotIdFromGroup, UnseenItemCategoryEnum } from '#base/api';
import { useVisibilityStore } from '#base/stores';
import { BotData } from '@nitrodevco/nitro-renderer';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryBotSlice
{
    botItems: IBotItem[];
    selectedBotItem: IBotItem;
    botNeedsUpdate: boolean;
    selectBotItem: (selectedBotItem?: IBotItem) => void;
    addBotItem: (botData: BotData) => void;
    processBotItems: (items: Map<number, BotData>) => void;
    removeBotItem: (itemId: number) => void;
    setBotNeedsUpdate: (flag: boolean) => void;
}

export const createInventoryBotSlice: StateCreator<
    InventoryBotSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryBotSlice
> = set =>
    ({
        botItems: [],
        selectedBotItem: null,
        botNeedsUpdate: true,
        selectBotItem: (selectedBotItem: IBotItem = null) => set(state =>
        {
            selectedBotItem = !selectedBotItem ? state.selectedBotItem : selectedBotItem;

            if (state.botItems.length)
            {
                if (selectedBotItem && state.botItems.indexOf(selectedBotItem) === -1) selectedBotItem = null;

                if (!selectedBotItem) selectedBotItem = state.botItems[0];
            }

            if (selectedBotItem)
            {
                state.removeUnseenItems(UnseenItemCategoryEnum.Bot, selectedBotItem.botData.id);
            }

            return { selectedBotItem };
        }),
        addBotItem: (botData: BotData) => set(state =>
        {
            if (!botData) return state;

            const botItems = [...state.botItems];
            const isUnseen = (state.unseenItems.get(UnseenItemCategoryEnum.Bot)?.indexOf(botData.id) >= 0);

            if (botItems.filter(item => item.botData.id === botData.id).length > 0) return state;

            const botItem: IBotItem = {
                botData: botData,
            };

            if (isUnseen) botItems.unshift(botItem);
            else botItems.push(botItem);

            return { botItems };
        }),
        processBotItems: (items: Map<number, BotData>) => set(state =>
        {
            const botItems = [...state.botItems];
            const existingIds = botItems.map(item => item.botData.id);
            const addedDatas: BotData[] = [];

            for (const botData of items.values()) ((existingIds.indexOf(botData.id) === -1) && addedDatas.push(botData));

            for (const existingId of existingIds)
            {
                let remove = true;

                for (const botData of items.values())
                {
                    if (botData.id === existingId)
                    {
                        remove = false;

                        break;
                    }
                }

                if (!remove) continue;

                const index = botItems.findIndex(item => (item.botData.id === existingId));
                const botItem = botItems[index];

                if ((index === -1) || !botItem) continue;

                if (GetPlacingItemId() === botItem.botData.id)
                {
                    CancelRoomObjectPlacement();

                    useVisibilityStore.setState({ inventoryVisible: true });
                }

                botItems.splice(index, 1);
            }

            for (const botData of addedDatas)
            {
                const botItem: IBotItem = { botData };
                const unseen = (state.unseenItems.get(UnseenItemCategoryEnum.Bot)?.indexOf(botData.id) >= 0);

                if (unseen) botItems.unshift(botItem);
                else botItems.push(botItem);
            }

            return { botItems };
        }),
        removeBotItem: (botId: number) => set(state =>
        {
            const botItems = [...state.botItems];

            RemoveBotIdFromGroup(botItems, botId);

            return { botItems };
        }),
        setBotNeedsUpdate: (flag: boolean) => set({ botNeedsUpdate: flag }),
    });

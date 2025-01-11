import { CancelRoomObjectPlacement, GetPlacingItemId, IBotItem, RemoveBotIdFromGroup, UnseenItemCategory } from '#base/api';
import { BotData } from '@nitrots/nitro-renderer';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryBotSlice
{
    botItems: IBotItem[];
    addBotItem: (botData: BotData) => void;
    processBotItems: (items: Map<number, BotData>) => void;
    removeBotItem: (itemId: number) => void;
}

export const createInventoryBotSlice: StateCreator<
    InventoryBotSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryBotSlice
> = set =>
    ({
        botItems: [],
        addBotItem: (botData: BotData) => set(state =>
        {
            if (!botData) return state;

            const botItems = [...state.botItems];
            const isUnseen = state.isUnseen(UnseenItemCategory.BOT, botData.id);

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

                    // TODO CreateLinkEvent('inventory/open');
                }

                botItems.splice(index, 1);
            }

            for (const botData of addedDatas)
            {
                const botItem: IBotItem = { botData };
                const unseen = state.isUnseen(UnseenItemCategory.BOT, botData.id);

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
        })
    });

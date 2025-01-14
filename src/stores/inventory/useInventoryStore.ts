import { create } from 'zustand';
import { createInventoryBadgesSlice, InventoryBadgesSlice } from './createInventoryBadgesSlice';
import { createInventoryBotSlice, InventoryBotSlice } from './createInventoryBotSlice';
import { createInventoryFurniSlice, InventoryFurniSlice } from './createInventoryFurniSlice';
import { createInventoryPetSlice, InventoryPetSlice } from './createInventoryPetSlice';
import { createInventoryTradeSlice, InventoryTradeSlice } from './createInventoryTradeSlice';
import { createInventoryUnseenSlice, InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventorySlice extends InventoryUnseenSlice, InventoryBadgesSlice, InventoryFurniSlice, InventoryPetSlice, InventoryBotSlice, InventoryTradeSlice
{
    currentTabIndex: number;
    setCurrentTabIndex: (index: number) => void;
}

export const useInventoryStore = create<InventorySlice>((set, get, store) => ({
    currentTabIndex: 0,
    setCurrentTabIndex: (index: number) => set({ currentTabIndex: index }),
    ...createInventoryUnseenSlice(set, get, store),
    ...createInventoryBadgesSlice(set, get, store),
    ...createInventoryFurniSlice(set, get, store),
    ...createInventoryPetSlice(set, get, store),
    ...createInventoryBotSlice(set, get, store),
    ...createInventoryTradeSlice(set, get, store)
}));

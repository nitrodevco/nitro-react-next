import { create } from 'zustand';
import { createInventoryBadgesSlice, InventoryBadgesSlice } from './createInventoryBadgesSlice';
import { createInventoryBotSlice, InventoryBotSlice } from './createInventoryBotSlice';
import { createInventoryFurniSlice, InventoryFurniSlice } from './createInventoryFurniSlice';
import { createInventoryPetSlice, InventoryPetSlice } from './createInventoryPetSlice';
import { createInventoryUnseenSlice, InventoryUnseenSlice } from './createInventoryUnseenSlice';

export const useInventoryStore = create<InventoryUnseenSlice & InventoryBadgesSlice & InventoryFurniSlice & InventoryPetSlice & InventoryBotSlice>()((...a) => ({
    ...createInventoryUnseenSlice(...a),
    ...createInventoryBadgesSlice(...a),
    ...createInventoryFurniSlice(...a),
    ...createInventoryPetSlice(...a),
    ...createInventoryBotSlice(...a)
}));

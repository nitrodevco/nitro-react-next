import { IPetItem, RemovePetIdFromGroup, UnseenItemCategoryEnum } from '#base/api';
import { PetData } from '@nitrodevco/nitro-renderer';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryPetSlice
{
    petItems: IPetItem[];
    selectedPetItem: IPetItem;
    petNeedsUpdate: boolean;
    selectPetItem: (selectedPetItem?: IPetItem) => void;
    addPetItem: (petData: PetData) => void;
    processPetItems: (items: Map<number, PetData>) => void;
    removePetItem: (itemId: number) => void;
    setPetNeedsUpdate: (flag: boolean) => void;
}

export const createInventoryPetSlice: StateCreator<
    InventoryPetSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryPetSlice
> = set =>
    ({
        petItems: [],
        selectedPetItem: null,
        petNeedsUpdate: true,
        selectPetItem: (selectedPetItem: IPetItem = null) => set(state =>
        {
            selectedPetItem = !selectedPetItem ? state.selectedPetItem : selectedPetItem;

            if (state.petItems.length)
            {
                if (selectedPetItem && state.petItems.indexOf(selectedPetItem) === -1) selectedPetItem = null;

                if (!selectedPetItem) selectedPetItem = state.petItems[0];
            }

            if (selectedPetItem)
            {
                state.removeUnseenItems(UnseenItemCategoryEnum.Pet, selectedPetItem.petData.id);
            }

            return { selectedPetItem };
        }),
        addPetItem: (petData: PetData) => set(state =>
        {
            if (!petData) return state;

            const petItems = [...state.petItems];
            const isUnseen = (state.unseenItems.get(UnseenItemCategoryEnum.Pet)?.indexOf(petData.id) >= 0);

            if (petItems.filter(item => item.petData.id === petData.id).length > 0) return state;

            const petItem: IPetItem = {
                petData: petData,
            };

            if (isUnseen) petItems.unshift(petItem);
            else petItems.push(petItem);

            return { petItems };
        }),
        processPetItems: (items: Map<number, PetData>) => set(state =>
        {
            const petItems = [...state.petItems];
            const existingIds = petItems.map(item => item.petData.id);
            const addedIds: number[] = [];
            const removedIds: number[] = [];

            for (const key of items.keys())
            {
                if (existingIds.indexOf(key) === -1) addedIds.push(key);
            }

            for (const itemId of existingIds)
            {
                if (!items.get(itemId)) removedIds.push(itemId);
            }

            for (const id of removedIds) RemovePetIdFromGroup(petItems, id);

            for (const id of addedIds)
            {
                const parser = items.get(id);

                if (!parser) continue;

                const isUnseen = (state.unseenItems.get(UnseenItemCategoryEnum.Pet)?.indexOf(parser.id) >= 0);
                const petItem: IPetItem = {
                    petData: parser,
                };

                if (isUnseen) petItems.unshift(petItem);
                else petItems.push(petItem);
            }

            return { petItems };
        }),
        removePetItem: (itemId: number) => set(state =>
        {
            const petItems = [...state.petItems];

            RemovePetIdFromGroup(petItems, itemId);

            return { petItems };
        }),
        setPetNeedsUpdate: (flag: boolean) => set({ petNeedsUpdate: flag }),
    });

import { create } from 'zustand';

interface VisibilitySlice
{
    navigationVisible: boolean;
    inventoryVisible: boolean;
}

export const useVisibilityStore = create<VisibilitySlice>(set => ({
    navigationVisible: false,
    inventoryVisible: false
}));

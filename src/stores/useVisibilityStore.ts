import { create } from 'zustand';

interface VisibilitySlice
{
    landingViewVisible: boolean;
    navigationVisible: boolean;
    inventoryVisible: boolean;
}

export const useVisibilityStore = create<VisibilitySlice>(set => ({
    landingViewVisible: true,
    navigationVisible: false,
    inventoryVisible: false
}));

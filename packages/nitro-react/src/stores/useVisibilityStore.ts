import { create } from 'zustand';

interface VisibilitySlice
{
    loadingVisible: boolean;
    landingViewVisible: boolean;
    navigationVisible: boolean;
    inventoryVisible: boolean;
    catalogVisible: boolean;
}

export const useVisibilityStore = create<VisibilitySlice>(set => ({
    loadingVisible: false,
    landingViewVisible: true,
    navigationVisible: false,
    inventoryVisible: false,
    catalogVisible: false
}));

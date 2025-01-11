import { create } from 'zustand';

interface VisibilitySlice
{
    navigationVisible: boolean;
}

export const useVisibilityStore = create<VisibilitySlice>(set => ({
    navigationVisible: false
}));

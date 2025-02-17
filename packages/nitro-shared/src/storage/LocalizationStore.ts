import { createStore } from 'zustand';

type State = {
    localization: Record<string, string>;
    badgePointLimits: Record<string, number>;
    localizationNeedsUpdate: boolean;
}

type Actions = {
    setLocalization: (localization: Record<string, string>) => void;
    setLocalizationValue: (key: string, value: string) => void;
    setBadgePointLimits: (badgePointLimits: Record<string, number>) => void;
    setLocalizationNeedsUpdate: (localizationNeedsUpdate: boolean) => void;
}

const initialState: State = {
    localization: null,
    badgePointLimits: null,
    localizationNeedsUpdate: true
};

export const LocalizationStore = createStore<State & Actions>(set => ({
    ...initialState,
    setLocalization: (localizations: Record<string, string>) => set(state =>
    {
        return { localization: { ...state.localization, ...localizations }, localizationNeedsUpdate: false };
    }),
    setLocalizationValue: (key: string, value: string) => set(state =>
    {
        return { localization: { ...state.localization, [key]: value } };
    }),
    setBadgePointLimits: (badgePointLimits: Record<string, number>) => set({ badgePointLimits }),
    setLocalizationNeedsUpdate: (localizationNeedsUpdate: boolean) => set({ localizationNeedsUpdate })
}));

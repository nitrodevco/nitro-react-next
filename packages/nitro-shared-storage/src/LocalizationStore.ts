import { createStore } from 'zustand';

type State = {
    localization: {};
    badgePointLimits: Record<string, number>;
    localizationNeedsUpdate: boolean;
}

type Actions = {
    setLocalization: (localization: {}) => void;
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
    setLocalization: (localization: {}) => set({ localization, localizationNeedsUpdate: false }),
    setLocalizationValue: (key: string, value: string) => set(state =>
    {
        return { localization: { ...state.localization, [key]: value } };
    }),
    setBadgePointLimits: (badgePointLimits: Record<string, number>) => set({ badgePointLimits }),
    setLocalizationNeedsUpdate: (localizationNeedsUpdate: boolean) => set({ localizationNeedsUpdate })
}));

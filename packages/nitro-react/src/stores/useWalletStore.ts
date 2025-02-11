import { UserSubscriptionParser } from '@nitrodevco/nitro-renderer';
import { create } from 'zustand';

type State = {
    currencies: { [key: number]: number };
    clubDays: number;
    clubPeriods: number;
    hasClubLeft: boolean;
    isVip: boolean;
    pastClubDays: number;
    pastVipDays: number;
    isExpiring: boolean;
    minutesUntilExpiration: number;
    minutesSinceLastModified: number;
    clubLevel: number;
    walletNeedsUpdate: boolean;
}

type Actions = {
    setCurrency: (type: number, amount: number) => void;
    setCurrencies: (currencies: { [key: string]: number }) => void;
    processUserSubscription: (data: UserSubscriptionParser) => void;
    setWalletNeedsUpdate: (flag: boolean) => void;
}

const initialState: State = {
    currencies: {},
    clubDays: 0,
    clubPeriods: 0,
    hasClubLeft: false,
    isVip: false,
    pastClubDays: 0,
    pastVipDays: 0,
    isExpiring: false,
    minutesUntilExpiration: 0,
    minutesSinceLastModified: 0,
    clubLevel: 0,
    walletNeedsUpdate: true,
};

export const useWalletStore = create<State & Actions>(set => ({
    ...initialState,
    setCurrency: (type: number, amount: number) => set(state =>
    {
        const currencies = { ...state.currencies };

        currencies[type] = amount;

        return { currencies };
    }),
    setCurrencies: (currencies: { [key: string]: number }) => set(state =>
    {
        const newCurrencies = { ...state.currencies, ...currencies };

        return { currencies: newCurrencies };
    }),
    processUserSubscription: (data: UserSubscriptionParser) => set(state =>
    {
        return {
            clubDays: Math.max(0, data.daysToPeriodEnd),
            clubPeriods: Math.max(0, data.periodsSubscribedAhead),
            isVip: data.isVip,
            pastClubDays: data.pastClubDays,
            pastVipDays: data.pastVipDays,
            isExpiring: ((data.responseType === UserSubscriptionParser.RESPONSE_TYPE_DISCOUNT_AVAILABLE) ? true : false),
            minutesUntilExpiration: data.minutesUntilExpiration,
            minutesSinceLastModified: data.minutesSinceLastModified
        };
    }),
    setWalletNeedsUpdate: (flag: boolean) => set({ walletNeedsUpdate: flag })
}));

import { SendMessageComposer } from '#base/api';
import { BadgesParser, SetActivatedBadgesComposer } from '@nitrodevco/nitro-renderer';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryBadgesSlice
{
    badgeIds: { [key: string]: number };
    badgeCodes: string[];
    activeBadgeCodes: string[];
    selectedBadgeCode: string;
    badgeNeedsUpdate: boolean;
    selectBadgeCode: (badgeCode: string) => void;
    toggleBadgeCode: (badgeCode: string, maxBadgeCount: number) => void;
    processBadges: (badges: BadgesParser) => void;
    addBadge: (badgeId: number, badgeCode: string) => void;
    setBadgeNeedsUpdate: (flag: boolean) => void;
}

export const createInventoryBadgesSlice: StateCreator<
    InventoryBadgesSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryBadgesSlice
> = set =>
    ({
        badgeIds: {},
        badgeCodes: [],
        activeBadgeCodes: [],
        selectedBadgeCode: null,
        badgeNeedsUpdate: true,
        selectBadgeCode: (badgeCode: string) => set(state =>
        {
            return { selectedBadgeCode: badgeCode };
        }),
        toggleBadgeCode: (badgeCode: string, maxBadgeCount: number) => set(state =>
        {
            const activeBadgeCodes = [...state.activeBadgeCodes];
            const index = activeBadgeCodes.indexOf(badgeCode);

            if (index === -1)
            {
                if (!(activeBadgeCodes.length < maxBadgeCount)) return state;

                activeBadgeCodes.push(badgeCode);
            }
            else activeBadgeCodes.splice(index, 1);

            const composer = new SetActivatedBadgesComposer();

            for (let i = 0; i < maxBadgeCount; i++) composer.addActivatedBadge(activeBadgeCodes[i] ?? '');

            SendMessageComposer(composer);

            return { activeBadgeCodes };
        }),
        processBadges: (badges: BadgesParser) => set(state =>
        {
            if (!badges) return state;

            const badgeIds = { ...state.badgeIds };
            const badgeCodes = [...state.badgeCodes];
            const activeBadgeCodes = [...badges.getActiveBadgeCodes()];

            badges.getAllBadgeCodes().forEach(badgeCode =>
            {
                if (badgeCodes.includes(badgeCode)) return;

                const badgeId = badges.getBadgeId(badgeCode);

                badgeIds[badgeCode] = badgeId;
                badgeCodes.push(badgeCode);
            });

            return { badgeIds, badgeCodes, activeBadgeCodes };
        }),
        addBadge: (badgeId: number, badgeCode: string) => set(state =>
        {
            const badgeIds = { ...state.badgeIds };
            const badgeCodes = [...state.badgeCodes];

            badgeIds[badgeCode] = badgeId;
            badgeCodes.push(badgeCode);

            return { badgeCodes, badgeIds };
        }),
        setBadgeNeedsUpdate: (flag: boolean) => set({ badgeNeedsUpdate: flag })
    });

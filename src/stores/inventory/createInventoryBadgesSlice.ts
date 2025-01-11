import { UnseenItemCategory } from '#base/api';
import { BadgesParser } from '@nitrots/nitro-renderer';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryBadgesSlice
{
    badgeIds: Map<string, number>;
    badgeCodes: string[];
    activeBadgeCodes: string[];
    processBadges: (badges: BadgesParser) => void;
    addBadge: (badgeId: number, badgeCode: string) => void;
}

export const createInventoryBadgesSlice: StateCreator<
    InventoryBadgesSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryBadgesSlice
> = set =>
    ({
        badgeCodes: [],
        badgeIds: new Map(),
        activeBadgeCodes: [],
        processBadges: (badges: BadgesParser) => set(state =>
        {
            if (!badges) return state;

            const badgeIds = new Map(state.badgeIds);
            const badgeCodes = [...state.badgeCodes];

            badges.getAllBadgeCodes().forEach(badgeCode =>
            {
                if (badgeCodes.includes(badgeCode)) return;

                const badgeId = badges.getBadgeId(badgeCode);

                badgeIds.set(badgeCode, badgeId);
                badgeCodes.push(badgeCode);
            });

            return { badgeIds, badgeCodes, activeBadgeCodes: badges.getActiveBadgeCodes() };
        }),
        addBadge: (badgeId: number, badgeCode: string) => set(state =>
        {
            const badgeCodes = [...state.badgeCodes];
            const badgeIds = new Map(state.badgeIds);
            const unseen = state.isUnseen(UnseenItemCategory.BADGE, badgeId);

            badgeCodes.push(badgeCode);
            badgeIds.set(badgeCode, badgeId);

            return { badgeCodes, badgeIds };
        })
    });

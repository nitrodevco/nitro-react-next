import { SendMessageComposer } from '#base/api';
import { useBadgeLocalization, useConfigValue, useLocalization } from '#base/hooks';
import { useInventoryStore } from '#base/stores';
import { NitroBadgeImage, NitroButton, NitroInfiniteGrid } from '#themes/default';
import { RequestBadgesComposer } from '@nitrodevco/nitro-renderer';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryBadgeItemView } from './InventoryBadgeItemView';

export const InventoryBadgeView: FC<{
}> = props =>
    {
        const [
            badgeIds,
            badgeCodes,
            activeBadgeCodes,
            selectedBadgeCode,
            badgeNeedsUpdate,
            selectBadgeCode,
            toggleBadgeCode,
            setBadgeNeedsUpdate
        ] = useInventoryStore(
            useShallow(state => [
                state.badgeIds,
                state.badgeCodes,
                state.activeBadgeCodes,
                state.selectedBadgeCode,
                state.badgeNeedsUpdate,
                state.selectBadgeCode,
                state.toggleBadgeCode,
                state.setBadgeNeedsUpdate
            ]));
        const isWearingBadge = (badgeCode: string) => activeBadgeCodes.includes(badgeCode);
        const maxBadgeCount = useConfigValue<number>('settings.maxBadges', 5);
        const selectedBadgeLocalization = useBadgeLocalization(selectedBadgeCode);
        const translation = useLocalization();

        useEffect(() =>
        {
            if (!badgeNeedsUpdate) return;

            SendMessageComposer(new RequestBadgesComposer());

            setBadgeNeedsUpdate(false);
        }, [badgeNeedsUpdate]);

        const toggleBadge = (badgeCode: string) =>
        {
            if (!badgeCode || !badgeCode.length) return;

            toggleBadgeCode(badgeCode, maxBadgeCount);
        }

        const nonActiveBadgeCodes = badgeCodes.filter(badgeCode => !activeBadgeCodes.includes(badgeCode));

        return (
            <div className="grid h-full grid-cols-12 gap-2">
                <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                    {(nonActiveBadgeCodes?.length > 0) &&
                        <NitroInfiniteGrid<string>
                            key="inventory-badges"
                            items={nonActiveBadgeCodes}
                            getKey={item => badgeIds[item]}
                            itemRender={item => <InventoryBadgeItemView badgeId={badgeIds[item] ?? -1} badgeCode={item} selectedBadgeCode={selectedBadgeCode} selectBadgeCode={selectBadgeCode} toggleBadgeCode={toggleBadge} />} />}
                </div>
                <div className="flex flex-col justify-between col-span-5 overflow-auto">
                    <div className="flex flex-col gap-1 overflow-hidden size-full">
                        <span className="text-base truncate">{translation('inventory.badges.activebadges')}</span>
                        {(activeBadgeCodes?.length > 0) &&
                            <div
                                className="grid grid-cols-3 w-full gap-1">
                                <>
                                    {activeBadgeCodes.map((badgeCode, index) =>
                                    {
                                        return <InventoryBadgeItemView key={badgeIds[badgeCode]} badgeId={badgeIds[badgeCode]} badgeCode={badgeCode} selectedBadgeCode={selectedBadgeCode} selectBadgeCode={selectBadgeCode} toggleBadgeCode={toggleBadge} />
                                    })}
                                </>
                            </div>}
                    </div>
                    {!!selectedBadgeCode &&
                        <div className="flex flex-col gap-2 grow">
                            <div className="flex items-center gap-2">
                                <NitroBadgeImage className="shrink" badgeCode={selectedBadgeCode} />
                                <span className="text-sm truncate grow">{selectedBadgeLocalization.name}</span>
                            </div>
                            <NitroButton
                                disabled={!isWearingBadge(selectedBadgeCode) && !(activeBadgeCodes.length < maxBadgeCount)}
                                onClick={event => toggleBadge(selectedBadgeCode)}>
                                {translation(isWearingBadge(selectedBadgeCode) ? 'inventory.badges.clearbadge' : 'inventory.badges.wearbadge')}
                            </NitroButton>
                        </div>}
                </div>
            </div>
        );
    };

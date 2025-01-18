import { SendMessageComposer } from '#base/api';
import { useInventoryStore } from '#base/stores';
import { NitroInfiniteGrid } from '#themes/default/layout';
import { RequestBadgesComposer } from '@nitrots/nitro-renderer';
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

    useEffect(() =>
    {
        if(!badgeNeedsUpdate) return;

        SendMessageComposer(new RequestBadgesComposer());

        setBadgeNeedsUpdate(false);
    }, [ badgeNeedsUpdate ]);

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                <NitroInfiniteGrid<string>
                    items={ badgeCodes }
                    itemRender={ item => <InventoryBadgeItemView badgeId={ badgeIds[item] ?? -1 } badgeCode={ item } selectedBadgeCode={ selectedBadgeCode } selectBadgeCode={ selectBadgeCode } toggleBadgeCode={ toggleBadgeCode } /> } />
            </div>
            <div className="flex flex-col col-span-5">
                <div className="relative flex flex-col">
                    {/* <NitroInfiniteGrid<string>
                        items={ activeBadgeCodes }
                        itemRender={ item => <InventoryBadgeItemView badgeId={ badgeIds[item] ?? -1 } badgeCode={ item } selectedBadgeCode={ selectedBadgeCode } selectBadgeCode={ selectBadgeCode } toggleBadgeCode={ toggleBadgeCode } /> } /> */}
                </div>
            </div>
        </div>
    );
};

import { LocalizeBadgeName, LocalizeText, SendMessageComposer } from '#base/api';
import { NitroConfigContext } from '#base/context/NitroConfigContext.tsx';
import { useInventoryStore } from '#base/stores';
import { NitroBadgeImage, NitroButton, NitroInfiniteGrid } from '#themes/default/layout';
import { RequestBadgesComposer } from '@nitrots/nitro-renderer';
import { FC, useContext, useEffect } from 'react';
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
    const { getConfigValue = null } = useContext(NitroConfigContext);

    useEffect(() =>
    {
        if(!badgeNeedsUpdate) return;

        SendMessageComposer(new RequestBadgesComposer());

        setBadgeNeedsUpdate(false);
    }, [ badgeNeedsUpdate ]);

    const toggleBadge = (badgeCode: string) =>
    {
        if(!badgeCode || !badgeCode.length) return;

        const maxBadgeCount = getConfigValue<number>('settings.maxBadges', 5);

        toggleBadgeCode(badgeCode, maxBadgeCount);
    }

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                { (badgeCodes?.length > 0) &&
                    <NitroInfiniteGrid<string>
                    key="inventory-badges"
                    items={ badgeCodes.filter(badgeCode => !activeBadgeCodes.includes(badgeCode)) }
                    itemRender={ item => <InventoryBadgeItemView badgeId={ badgeIds[item] ?? -1 } badgeCode={ item } selectedBadgeCode={ selectedBadgeCode } selectBadgeCode={ selectBadgeCode } toggleBadgeCode={ toggleBadge } /> } /> }
            </div>
            <div className="flex flex-col justify-between col-span-5 overflow-auto">
                <div className="flex flex-col gap-1 overflow-hidden size-full">
                    <span className="text-base truncate grow">{ LocalizeText('inventory.badges.activebadges') }</span>
                    { (activeBadgeCodes?.length > 0) &&
                        <NitroInfiniteGrid<string>
                            overrideColumnCount={ 3 }
                            items={ activeBadgeCodes }
                            itemRender={ item => <InventoryBadgeItemView badgeId={ badgeIds[item] ?? -1 } badgeCode={ item } selectedBadgeCode={ selectedBadgeCode } selectBadgeCode={ selectBadgeCode } toggleBadgeCode={ toggleBadge } /> } /> }
                </div>
                { !!selectedBadgeCode &&
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex items-center gap-2">
                            <NitroBadgeImage className="shrink" badgeCode={ selectedBadgeCode } />
                            <span className="text-sm truncate grow">{ LocalizeBadgeName(selectedBadgeCode) }</span>
                        </div>
                        <NitroButton
                            disabled={ !isWearingBadge(selectedBadgeCode) && !(activeBadgeCodes.length < getConfigValue<number>('user.badges.max.slots', 5)) }
                            onClick={ event => toggleBadge(selectedBadgeCode) }>
                                { LocalizeText(isWearingBadge(selectedBadgeCode) ? 'inventory.badges.clearbadge' : 'inventory.badges.wearbadge') }
                        </NitroButton>
                    </div> }
            </div>
        </div>
    );
};

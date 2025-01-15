import { LocalizeText, TradeState, UnseenItemCategory } from '#base/api';
import { useInventoryStore, useRoomStore, useVisibilityStore } from '#base/stores';
import { NitroCard } from '#themes/default/layout';
import { GetRoomEngine, RoomPreviewer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryFurnitureView } from './furniture';
import { InventoryPetView } from './pet';

const TABS = [
    {
        name: 'inventory.furni',
        component: InventoryFurnitureView,
        unseenCategory: UnseenItemCategory.FURNI
    },
    {
        name: 'inventory.bots',
        component: InventoryFurnitureView,
        unseenCategory: UnseenItemCategory.BOT
    },
    {
        name: 'inventory.furni.tab.pets',
        component: InventoryPetView,
        unseenCategory: UnseenItemCategory.PET
    },
    {
        name: 'inventory.badges',
        component: InventoryFurnitureView,
        unseenCategory: UnseenItemCategory.BADGE
    }
];

export const InventoryView: FC = props =>
{
    const [ roomPreviewer, setRoomPreviewer ] = useState<RoomPreviewer>(null);
    const roomSession = useRoomStore(state => state.roomSession);
    const [
        currentTabIndex,
        tradeState,
        setCurrentTabIndex,
        getUnseenCount,
        resetUnseenCategory
    ] = useInventoryStore(
        useShallow(state => [
            state.currentTabIndex,
            state.tradeState,
            state.setCurrentTabIndex,
            state.getUnseenCount,
            state.resetUnseenCategory
        ]));

    const onClose = () =>
    {
        // if(isTrading) stopTrading();

        useVisibilityStore.setState({ inventoryVisible: false });
    }

    useEffect(() =>
    {
        setRoomPreviewer(new RoomPreviewer(GetRoomEngine(), ++RoomPreviewer.PREVIEW_COUNTER));

        return () =>
        {
            setRoomPreviewer(prevValue =>
            {
                prevValue.dispose();

                return null;
            });

            resetUnseenCategory(TABS[currentTabIndex]?.unseenCategory);
        }
    }, []);

    const CurrentTabComponent = () =>
    {
        const currentTab = TABS[currentTabIndex];

        if(!currentTab || !currentTab.component) return null;

        return <currentTab.component roomSession={ roomSession } roomPreviewer={ roomPreviewer }  />
    }

    return (
        <NitroCard
            className="w-inventory-w h-inventory-h min-w-inventory-w min-h-inventory-h"
            uniqueKey="inventory">
            <NitroCard.Header
                headerText={ LocalizeText('inventory.title') }
                onCloseClick={ onClose } />
            { (tradeState === TradeState.TRADING_STATE_READY) &&
                <>
                    <NitroCard.Tabs>
                        { TABS.map((component, index) =>
                        {
                            return (
                                <NitroCard.TabItem
                                    key={ index }
                                    count={ getUnseenCount(TABS[index]?.unseenCategory) }
                                    isActive={ (currentTabIndex === index) }
                                    onClick={ event => setCurrentTabIndex(index) }>
                                    { LocalizeText(TABS[index]?.name ?? '') }
                                </NitroCard.TabItem>
                            );
                        }) }
                    </NitroCard.Tabs>
                    <NitroCard.Content>
                        <CurrentTabComponent />
                    </NitroCard.Content>
                </> }
            {/* { isTrading &&
                <NitroCard.Content>
                    <InventoryTradeView cancelTrade={ onClose } />
                </NitroCard.Content> } */}
        </NitroCard>
    );
}

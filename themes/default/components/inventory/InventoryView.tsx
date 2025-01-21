import { LocalizeText, TradeState, UnseenItemCategory } from '#base/api';
import { useRoomPreviewer } from '#base/hooks/index.ts';
import { useInventoryStore, useVisibilityStore } from '#base/stores';
import { NitroCard } from '#themes/default/layout';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryBadgeView } from './badge';
import { InventoryBotView } from './bot';
import { InventoryFurnitureView } from './furniture';
import { InventoryCurrentTabComponent } from './InventoryCurrentTabView';
import { InventoryPetView } from './pet';

const TABS = [
    {
        name: 'inventory.furni',
        component: InventoryFurnitureView,
        unseenCategory: UnseenItemCategory.FURNI
    },
    {
        name: 'inventory.bots',
        component: InventoryBotView,
        unseenCategory: UnseenItemCategory.BOT
    },
    {
        name: 'inventory.furni.tab.pets',
        component: InventoryPetView,
        unseenCategory: UnseenItemCategory.PET
    },
    {
        name: 'inventory.badges',
        component: InventoryBadgeView,
        unseenCategory: UnseenItemCategory.BADGE
    }
];

export const InventoryView: FC = props =>
{
    const [
        currentTabIndex,
        tradeState,
        unseenItems,
        setCurrentTabIndex,
        resetUnseenCategory
    ] = useInventoryStore(
        useShallow(state => [
            state.currentTabIndex,
            state.tradeState,
            state.unseenItems,
            state.setCurrentTabIndex,
            state.resetUnseenCategory
        ]));
    const { roomPreviewer = null } = useRoomPreviewer();

    useEffect(() =>
    {
        return () =>
        {
            resetUnseenCategory(TABS[currentTabIndex]?.unseenCategory);
        }
    }, []);

    return (
        <NitroCard
            className="w-inventory-w h-inventory-h min-w-inventory-w min-h-inventory-h"
            uniqueKey="inventory">
            <NitroCard.Header
                headerText={ LocalizeText('inventory.title') }
                onCloseClick={ event =>
                    {
                        // if(isTrading) stopTrading();
                
                        useVisibilityStore.setState({ inventoryVisible: false });
                    } } />
            { (tradeState === TradeState.TRADING_STATE_READY) &&
                <>
                    <NitroCard.Tabs>
                        { TABS.map((component, index) =>
                        {
                            return (
                                <NitroCard.TabItem
                                    key={ index }
                                    count={ unseenItems.get(TABS[index]?.unseenCategory)?.length ?? 0 }
                                    isActive={ (currentTabIndex === index) }
                                    onClick={ event => setCurrentTabIndex(index) }>
                                    { LocalizeText(TABS[index]?.name ?? '') }
                                </NitroCard.TabItem>
                            );
                        }) }
                    </NitroCard.Tabs>
                    <NitroCard.Content>
                        <InventoryCurrentTabComponent
                            currentTabIndex={ currentTabIndex }
                            tabs={ TABS }
                            roomPreviewer={ roomPreviewer } />
                    </NitroCard.Content>
                </> }
            {/* { isTrading &&
                <NitroCard.Content>
                    <InventoryTradeView cancelTrade={ onClose } />
                </NitroCard.Content> } */}
        </NitroCard>
    );
}

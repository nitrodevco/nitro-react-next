import { AttemptItemPlacement, FurniCategory, IGroupItem, LocalizeText, SendMessageComposer } from '#base/api';
import { useInventoryStore, useRoomStore, useVisibilityStore } from '#base/stores';
import { NitroButton, NitroInfiniteGrid, NitroRarityLevel, NitroRoomPreviewer } from '#themes/default/layout';
import { FurnitureListComposer, GetRoomEngine, GetSessionDataManager, RoomObjectVariable, RoomPreviewer, Vector3d } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryCategoryEmptyView } from '../InventoryCategoryEmptyView';
import { InventoryFurnitureItemView } from './InventoryFurnitureItemView';
import { InventoryFurnitureSearchView } from './InventoryFurnitureSearchView';

const attemptPlaceMarketplaceOffer = (groupItem: IGroupItem) =>
{
    const item = groupItem.items[groupItem.items.length - 1];

    if(!item) return false;

    if(!item.sellable) return false;

    // TODO DispatchUiEvent(new CatalogPostMarketplaceOfferEvent(item));
};

export const InventoryFurnitureView: FC<{
    roomPreviewer: RoomPreviewer;
}> = props =>
{
    const { roomPreviewer = null } = props;

    const roomSession = useRoomStore(state => state.roomSession);
    const [
        furniItems,
        selectedFurniItem,
        furniNeedsUpdate,
        selectFurniItem,
        setFurniNeedsUpdate,
    ] = useInventoryStore(
        useShallow(state => [
            state.furniItems,
            state.selectedFurniItem,
            state.furniNeedsUpdate,
            state.selectFurniItem,
            state.setFurniNeedsUpdate
        ]));

    const [ filteredGroupItems, setFilteredGroupItems ] = useState<IGroupItem[]>(null);

    useEffect(() =>
    {
        if(!selectedFurniItem || !roomPreviewer) return;

        const furnitureItem = selectedFurniItem.items[selectedFurniItem.items.length - 1];

        if(!furnitureItem) return;

        const roomEngine = GetRoomEngine();

        let wallType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_WALL_TYPE);
        let floorType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_FLOOR_TYPE);
        let landscapeType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_LANDSCAPE_TYPE);

        wallType = (wallType && wallType.length) ? wallType : '101';
        floorType = (floorType && floorType.length) ? floorType : '101';
        landscapeType = (landscapeType && landscapeType.length) ? landscapeType : '1.1';

        roomPreviewer.reset(false);
        roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);
        roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);

        if((furnitureItem.category === FurniCategory.WALL_PAPER) || (furnitureItem.category === FurniCategory.FLOOR) || (furnitureItem.category === FurniCategory.LANDSCAPE))
        {
            floorType = ((furnitureItem.category === FurniCategory.FLOOR) ? selectedFurniItem.stuffData.getLegacyString() : floorType);
            wallType = ((furnitureItem.category === FurniCategory.WALL_PAPER) ? selectedFurniItem.stuffData.getLegacyString() : wallType);
            landscapeType = ((furnitureItem.category === FurniCategory.LANDSCAPE) ? selectedFurniItem.stuffData.getLegacyString() : landscapeType);

            roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);

            if(furnitureItem.category === FurniCategory.LANDSCAPE)
            {
                const data = GetSessionDataManager().getWallItemDataByName('window_double_default');

                if(data) roomPreviewer.addWallItemIntoRoom(data.id, new Vector3d(90, 0, 0), data.customParams);
            }
        }
        else
        {
            if(selectedFurniItem.isWallItem)
            {
                roomPreviewer.addWallItemIntoRoom(selectedFurniItem.type, new Vector3d(90), furnitureItem.stuffData.getLegacyString());
            }
            else
            {
                roomPreviewer.addFurnitureIntoRoom(selectedFurniItem.type, new Vector3d(90), selectedFurniItem.stuffData, (furnitureItem.extra.toString()));
            }
        }
    }, [ roomPreviewer, selectedFurniItem ]);

    useEffect(() =>
    {
        if(!filteredGroupItems) return;

        selectFurniItem(null, filteredGroupItems);
    }, [ filteredGroupItems ]);

    useEffect(() =>
    {
        if(!furniNeedsUpdate) return;

        SendMessageComposer(new FurnitureListComposer());

        setFurniNeedsUpdate(false);
    }, [ furniNeedsUpdate ]);

    if(!furniItems || !furniItems.length) return <InventoryCategoryEmptyView desc={ LocalizeText('inventory.empty.desc') } title={ LocalizeText('inventory.empty.title') } />;

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                <InventoryFurnitureSearchView groupItems={ furniItems } setGroupItems={ setFilteredGroupItems } />
                { (filteredGroupItems?.length > 0) &&
                    <NitroInfiniteGrid<IGroupItem>
                        key="inventory-furniture"
                        items={ filteredGroupItems }
                        itemRender={ item => <InventoryFurnitureItemView groupItem={ item } selectedFurniItem={ selectedFurniItem } selectFurniItem={ selectFurniItem } /> } /> }
            </div>
            <div className="flex flex-col col-span-5 overflow-hidden">
                <div className="relative flex flex-col">
                    <div className="h-[140px] w-full">
                        <NitroRoomPreviewer roomPreviewer={ roomPreviewer } />
                    </div>
                    {/* { selectedFurniItem && selectedFurniItem.stuffData.isUnique &&
                        <LayoutLimitedEditionCompactPlateView className="top-2 end-2" position="absolute" uniqueNumber={ selectedFurniItem.stuffData.uniqueNumber } uniqueSeries={ selectedFurniItem.stuffData.uniqueSeries } /> } */}
                    { (selectedFurniItem && selectedFurniItem.stuffData.rarityLevel > -1) &&
                        <NitroRarityLevel className="top-2 end-2 absolute" level={ selectedFurniItem.stuffData.rarityLevel } /> }
                </div>
                { selectedFurniItem &&
                    <div className="flex flex-col justify-between gap-2 grow">
                        <span className="text-sm truncate grow">{ selectedFurniItem.name }</span>
                        <div className="flex flex-col gap-1">
                            { !!roomSession &&
                                <NitroButton onClick={ event => {
                                    if(AttemptItemPlacement(selectedFurniItem)) useVisibilityStore.setState({ inventoryVisible: false });
                                } }>
                                    { LocalizeText('inventory.furni.placetoroom') }
                                </NitroButton> }
                            { (selectedFurniItem && selectedFurniItem.isSellable) &&
                                <NitroButton onClick={ event => attemptPlaceMarketplaceOffer(selectedFurniItem) }>
                                    { LocalizeText('inventory.marketplace.sell') }
                                </NitroButton> }
                        </div>
                    </div> }
            </div>
        </div>
    );
};

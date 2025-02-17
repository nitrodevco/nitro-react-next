import { AttemptItemPlacement, FurniCategoryEnum, IGroupItem, SendMessageComposer } from '#base/api';
import { useLocalization } from '#base/hooks';
import { useInventoryStore, useRoomStore, useVisibilityStore } from '#base/stores';
import { NitroButton, NitroInfiniteGrid, NitroRarityLevel, NitroRoomPreviewer } from '#themes/default';
import { FurnitureListComposer, GetRoomEngine, GetSessionDataManager, RoomObjectVariable, RoomPreviewer, Vector3d } from '@nitrodevco/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryCategoryEmptyView } from '../InventoryCategoryEmptyView';
import { InventoryFurnitureItemView } from './InventoryFurnitureItemView';
import { InventoryFurnitureSearchView } from './InventoryFurnitureSearchView';

const attemptPlaceMarketplaceOffer = (groupItem: IGroupItem) =>
{
    const item = groupItem.items[groupItem.items.length - 1];

    if (!item) return false;

    if (!item.sellable) return false;

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
        const translation = useLocalization();
        const [filteredGroupItems, setFilteredGroupItems] = useState<IGroupItem[]>(null);

        const getGroupItemName = (groupItem: IGroupItem) =>
        {
            if (!groupItem) return '';

            let key = '';

            switch (groupItem.category)
            {
                case FurniCategoryEnum.Poster:
                    key = (`poster_${groupItem.stuffData.getLegacyString()}_name`);
                    break;
                case FurniCategoryEnum.TraxSong:
                    return 'SONG_NAME';
                default:
                    key = groupItem.isWallItem ? `wallItem.name.${groupItem.type}` : `roomItem.name.${groupItem.type}`;
            }

            return translation(key);
        }

        useEffect(() =>
        {
            if (!selectedFurniItem || !roomPreviewer) return;

            const furnitureItem = selectedFurniItem.items[selectedFurniItem.items.length - 1];

            if (!furnitureItem) return;

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

            if ((furnitureItem.category === FurniCategoryEnum.Wallpaper) || (furnitureItem.category === FurniCategoryEnum.Floor) || (furnitureItem.category === FurniCategoryEnum.Landscape))
            {
                floorType = ((furnitureItem.category === FurniCategoryEnum.Floor) ? selectedFurniItem.stuffData.getLegacyString() : floorType);
                wallType = ((furnitureItem.category === FurniCategoryEnum.Wallpaper) ? selectedFurniItem.stuffData.getLegacyString() : wallType);
                landscapeType = ((furnitureItem.category === FurniCategoryEnum.Landscape) ? selectedFurniItem.stuffData.getLegacyString() : landscapeType);

                roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);

                if (furnitureItem.category === FurniCategoryEnum.Landscape)
                {
                    const data = GetSessionDataManager().getWallItemDataByName('window_double_default');

                    if (data) roomPreviewer.addWallItemIntoRoom(data.id, new Vector3d(90, 0, 0), data.customParams);
                }
            }
            else
            {
                if (selectedFurniItem.isWallItem)
                {
                    roomPreviewer.addWallItemIntoRoom(selectedFurniItem.type, new Vector3d(90), furnitureItem.stuffData.getLegacyString());
                }
                else
                {
                    roomPreviewer.addFurnitureIntoRoom(selectedFurniItem.type, new Vector3d(90), selectedFurniItem.stuffData, (furnitureItem.extra.toString()));
                }
            }
        }, [roomPreviewer, selectedFurniItem]);

        useEffect(() =>
        {
            if (!filteredGroupItems) return;

            selectFurniItem(null, filteredGroupItems);
        }, [filteredGroupItems]);

        useEffect(() =>
        {
            if (!furniNeedsUpdate) return;

            SendMessageComposer(new FurnitureListComposer());

            setFurniNeedsUpdate(false);
        }, [furniNeedsUpdate]);

        if (!furniItems || !furniItems.length) return <InventoryCategoryEmptyView desc={translation('inventory.empty.desc')} title={translation('inventory.empty.title')} />;

        return (
            <div className="grid h-full grid-cols-12 gap-2">
                <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                    <InventoryFurnitureSearchView groupItems={furniItems} setGroupItems={setFilteredGroupItems} />
                    {(filteredGroupItems?.length > 0) &&
                        <NitroInfiniteGrid<IGroupItem>
                            key="inventory-furniture"
                            items={filteredGroupItems}
                            getKey={item => item.items[0]?.id}
                            itemRender={item => <InventoryFurnitureItemView groupItem={item} selectedFurniItem={selectedFurniItem} selectFurniItem={selectFurniItem} />} />}
                </div>
                <div className="flex flex-col col-span-5 gap-1 overflow-hidden">
                    <div className="relative flex flex-col">
                        <div className="h-[140px] w-full">
                            <NitroRoomPreviewer roomPreviewer={roomPreviewer} />
                        </div>
                        {/* { selectedFurniItem && selectedFurniItem.stuffData.isUnique &&
                        <LayoutLimitedEditionCompactPlateView className="top-2 end-2" position="absolute" uniqueNumber={ selectedFurniItem.stuffData.uniqueNumber } uniqueSeries={ selectedFurniItem.stuffData.uniqueSeries } /> } */}
                        {(selectedFurniItem && selectedFurniItem.stuffData.rarityLevel > -1) &&
                            <NitroRarityLevel className="top-2 end-2 absolute" level={selectedFurniItem.stuffData.rarityLevel} />}
                    </div>
                    {selectedFurniItem &&
                        <div className="flex flex-col justify-between gap-2 grow">
                            <span className="text-sm truncate grow">{getGroupItemName(selectedFurniItem)}</span>
                            <div className="flex flex-col gap-1">
                                {!!roomSession &&
                                    <NitroButton onClick={event =>
                                    {
                                        if (AttemptItemPlacement(selectedFurniItem)) useVisibilityStore.setState({ inventoryVisible: false });
                                    }}>
                                        {translation('inventory.furni.placetoroom')}
                                    </NitroButton>}
                                {(selectedFurniItem && selectedFurniItem.isSellable) &&
                                    <NitroButton onClick={event => attemptPlaceMarketplaceOffer(selectedFurniItem)}>
                                        {translation('inventory.marketplace.sell')}
                                    </NitroButton>}
                            </div>
                        </div>}
                </div>
            </div>
        );
    };

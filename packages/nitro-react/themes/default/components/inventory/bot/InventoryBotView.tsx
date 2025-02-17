import { AttemptBotPlacement, IBotItem, SendMessageComposer } from '#base/api';
import { useLocalization } from '#base/hooks';
import { useInventoryStore, useRoomStore, useVisibilityStore } from '#base/stores';
import { NitroButton, NitroInfiniteGrid, NitroRoomPreviewer } from '#themes/default';
import { GetBotInventoryComposer, GetRoomEngine, RoomObjectVariable, RoomPreviewer } from '@nitrodevco/nitro-renderer';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryCategoryEmptyView } from '../InventoryCategoryEmptyView';
import { InventoryBotItemView } from './InventoryBotItemView';

export const InventoryBotView: FC<{
    roomPreviewer: RoomPreviewer;
}> = props =>
    {
        const { roomPreviewer = null } = props;

        const roomSession = useRoomStore(state => state.roomSession);
        const [
            botItems,
            selectedBotItem,
            botNeedsUpdate,
            selectBotItem,
            setBotNeedsUpdate
        ] = useInventoryStore(
            useShallow(state => [
                state.botItems,
                state.selectedBotItem,
                state.botNeedsUpdate,
                state.selectBotItem,
                state.setBotNeedsUpdate
            ]));
        const translation = useLocalization();

        useEffect(() =>
        {
            if (!selectedBotItem || !roomPreviewer) return;

            const botData = selectedBotItem.botData;

            const roomEngine = GetRoomEngine();

            let wallType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_WALL_TYPE);
            let floorType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_FLOOR_TYPE);
            let landscapeType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_LANDSCAPE_TYPE);

            wallType = (wallType && wallType.length) ? wallType : '101';
            floorType = (floorType && floorType.length) ? floorType : '101';
            landscapeType = (landscapeType && landscapeType.length) ? landscapeType : '1.1';

            roomPreviewer.reset(false);
            roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);
            roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);
            roomPreviewer.addAvatarIntoRoom(botData.figure, 0);
        }, [roomPreviewer, selectedBotItem]);

        useEffect(() =>
        {
            selectBotItem();
        }, [botItems]);

        useEffect(() =>
        {
            if (!botNeedsUpdate) return;

            SendMessageComposer(new GetBotInventoryComposer());

            setBotNeedsUpdate(false);
        }, [botNeedsUpdate]);

        const attemptPlacement = () => AttemptBotPlacement(selectedBotItem) && useVisibilityStore.setState({ inventoryVisible: false });

        if (!botItems || !botItems.length) return <InventoryCategoryEmptyView desc={translation('inventory.empty.desc')} title={translation('inventory.empty.title')} />;

        return (
            <div className="grid h-full grid-cols-12 gap-2">
                <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                    {(botItems?.length > 0) &&
                        <NitroInfiniteGrid<IBotItem>
                            key="inventory-bots"
                            items={botItems}
                            getKey={item => item.botData?.id}
                            itemRender={item => <InventoryBotItemView botItem={item} selectedBotItem={selectedBotItem} selectBotItem={selectBotItem} />} />}
                </div>
                <div className="flex flex-col col-span-5 gap-1 overflow-hidden">
                    <div className="relative flex flex-col">
                        <div className="h-[140px] w-full">
                            <NitroRoomPreviewer roomPreviewer={roomPreviewer} />
                        </div>
                    </div>
                    {selectedBotItem && selectedBotItem.botData &&
                        <div className="flex flex-col justify-between gap-2 grow">
                            <span className="text-sm truncate grow">{selectedBotItem.botData.name}</span>
                            <div className="flex flex-col gap-1">
                                {!!roomSession &&
                                    <NitroButton onClick={attemptPlacement}>
                                        {translation('inventory.furni.placetoroom')}
                                    </NitroButton>}
                            </div>
                        </div>}
                </div>
            </div>
        );
    };

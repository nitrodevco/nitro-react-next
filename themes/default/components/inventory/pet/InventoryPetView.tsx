import { AttemptPetPlacement, IPetItem, LocalizeText, SendMessageComposer } from '#base/api';
import { useInventoryStore, useVisibilityStore } from '#base/stores';
import { NitroButton, NitroInfiniteGrid, NitroRoomPreviewer } from '#themes/default/layout';
import { GetRoomEngine, IRoomSession, RequestPetsComposer, RoomObjectVariable, RoomPreviewer } from '@nitrots/nitro-renderer';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { InventoryCategoryEmptyView } from '../InventoryCategoryEmptyView';
import { InventoryPetItemView } from './InventoryPetItemView';

export const InventoryPetView: FC<{
    roomSession: IRoomSession;
    roomPreviewer: RoomPreviewer;
}> = props =>
{
    const { roomSession = null, roomPreviewer = null } = props;

    const [
        petItems,
        selectedPetItem,
        petNeedsUpdate,
        selectPetItem,
        setPetNeedsUpdate
    ] = useInventoryStore(
        useShallow(state => [
            state.petItems,
            state.selectedPetItem,
            state.petNeedsUpdate,
            state.selectPetItem,
            state.setPetNeedsUpdate
        ]));

    useEffect(() =>
    {
        if(!selectedPetItem || !roomPreviewer) return;

        const petData = selectedPetItem.petData;
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
        roomPreviewer.addPetIntoRoom(petData.figureString);
    }, [ roomPreviewer, selectedPetItem ]);

    useEffect(() =>
    {
        selectPetItem();
    }, [ petItems ]);

    useEffect(() =>
    {
        if(!petNeedsUpdate) return;

        SendMessageComposer(new RequestPetsComposer());

        setPetNeedsUpdate(false);
    }, [ petNeedsUpdate ]);

    if(!petItems || !petItems.length) return <InventoryCategoryEmptyView desc={ LocalizeText('inventory.empty.desc') } title={ LocalizeText('inventory.empty.title') } />;

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-1 overflow-hidden">
                <NitroInfiniteGrid<IPetItem>
                    items={ petItems }
                    itemRender={ item => <InventoryPetItemView petItem={ item } selectedPetItem={ selectedPetItem} selectPetItem={ selectPetItem } /> } />
            </div>
            <div className="flex flex-col col-span-5">
                <div className="relative flex flex-col">
                    <NitroRoomPreviewer height={ 140 } roomPreviewer={ roomPreviewer } />
                </div>
                { selectedPetItem && selectedPetItem.petData &&
                    <div className="flex flex-col justify-between gap-2 grow">
                        <span className="text-sm truncate grow">{ selectedPetItem.petData.name }</span>
                        <div className="flex flex-col gap-1">
                            { !!roomSession &&
                                <NitroButton onClick={ event => {
                                    if(AttemptPetPlacement(selectedPetItem)) useVisibilityStore.setState({ inventoryVisible: false });
                                } }>
                                    { LocalizeText('inventory.furni.placetoroom') }
                                </NitroButton> }
                        </div>
                    </div> }
            </div>
        </div>
    );
};

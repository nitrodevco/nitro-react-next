import { CanManipulateFurniture, DispatchUiEvent, GetRoomSession, InitializeRoomInstanceRenderingCanvas, IsFurnitureSelectionDisabled, ProcessRoomObjectOperation, RoomWidgetUpdateRoomObjectEvent, SetActiveRoomId, StartRoomSession } from '#base/api';
import { useRoomStore } from '#base/stores';
import { GetRenderer, GetRoomEngine, GetStage, NitroAdjustmentFilter, NitroSprite, NitroTexture, RoomEngineEvent, RoomEngineObjectEvent, RoomGeometry, RoomId, RoomObjectCategory, RoomObjectOperationType, RoomSessionEvent, RoomVariableEnum, Vector3d } from '@nitrots/nitro-renderer';
import { useEffect, useRef } from 'react';
import { useNitroEvent } from './events';

export const useRoom = () =>
{
    const roomSession = useRoomStore(state => state.roomSession);
    const setRoomSession = useRoomStore(state => state.setRoomSession);
    const roomBackground = useRef<NitroSprite>(null);
    const roomFilter = useRef<NitroAdjustmentFilter>(null);

    useNitroEvent<RoomEngineEvent>([
        RoomEngineEvent.INITIALIZED,
        RoomEngineEvent.DISPOSED
    ], event =>
    {
        if (RoomId.isRoomPreviewerId(event.roomId)) return;

        const session = GetRoomSession();

        if (!session) return;

        switch (event.type)
        {
            case RoomEngineEvent.INITIALIZED:
                SetActiveRoomId(event.roomId);
                setRoomSession(session);
                return;
            case RoomEngineEvent.DISPOSED:
                setRoomSession(null);
                return;
        }
    });

    useNitroEvent<RoomSessionEvent>([
        RoomSessionEvent.CREATED,
        RoomSessionEvent.ENDED
    ], event =>
    {
        switch (event.type)
        {
            case RoomSessionEvent.CREATED:
                StartRoomSession(event.session);
                return;
            case RoomSessionEvent.ENDED:
                setRoomSession(null);
                return;
        }
    });

    useNitroEvent<RoomEngineObjectEvent>([
        RoomEngineObjectEvent.SELECTED,
        RoomEngineObjectEvent.DESELECTED,
        RoomEngineObjectEvent.ADDED,
        RoomEngineObjectEvent.REMOVED,
        RoomEngineObjectEvent.PLACED,
        RoomEngineObjectEvent.REQUEST_MOVE,
        RoomEngineObjectEvent.REQUEST_ROTATE,
        RoomEngineObjectEvent.MOUSE_ENTER,
        RoomEngineObjectEvent.MOUSE_LEAVE,
        RoomEngineObjectEvent.DOUBLE_CLICK
    ], event =>
    {
        if (RoomId.isRoomPreviewerId(event.roomId)) return;

        let updateEvent: RoomWidgetUpdateRoomObjectEvent = null;

        switch (event.type)
        {
            case RoomEngineObjectEvent.SELECTED:
                if (!IsFurnitureSelectionDisabled(event)) updateEvent = new RoomWidgetUpdateRoomObjectEvent(RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED, event.objectId, event.category, event.roomId);
                break;
            case RoomEngineObjectEvent.DESELECTED:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED, event.objectId, event.category, event.roomId);
                break;
            case RoomEngineObjectEvent.ADDED: {
                let addedEventType: string = null;

                switch (event.category)
                {
                    case RoomObjectCategory.FLOOR:
                    case RoomObjectCategory.WALL:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_ADDED;
                        break;
                    case RoomObjectCategory.UNIT:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.USER_ADDED;
                        break;
                }

                if (addedEventType) updateEvent = new RoomWidgetUpdateRoomObjectEvent(addedEventType, event.objectId, event.category, event.roomId);
                break;
            }
            case RoomEngineObjectEvent.REMOVED: {
                let removedEventType: string = null;

                switch (event.category)
                {
                    case RoomObjectCategory.FLOOR:
                    case RoomObjectCategory.WALL:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED;
                        break;
                    case RoomObjectCategory.UNIT:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.USER_REMOVED;
                        break;
                }

                if (removedEventType) updateEvent = new RoomWidgetUpdateRoomObjectEvent(removedEventType, event.objectId, event.category, event.roomId);
                break;
            }
            case RoomEngineObjectEvent.REQUEST_MOVE:
                if (CanManipulateFurniture(roomSession, event.objectId, event.category)) ProcessRoomObjectOperation(event.objectId, event.category, RoomObjectOperationType.OBJECT_MOVE);
                break;
            case RoomEngineObjectEvent.REQUEST_ROTATE:
                if (CanManipulateFurniture(roomSession, event.objectId, event.category)) ProcessRoomObjectOperation(event.objectId, event.category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                break;
            case RoomEngineObjectEvent.MOUSE_ENTER:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER, event.objectId, event.category, event.roomId);
                break;
            case RoomEngineObjectEvent.MOUSE_LEAVE:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT, event.objectId, event.category, event.roomId);
                break;
            case RoomEngineObjectEvent.DOUBLE_CLICK:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(RoomWidgetUpdateRoomObjectEvent.OBJECT_DOUBLE_CLICKED, event.objectId, event.category, event.roomId);
                break;
        }

        if (updateEvent) DispatchUiEvent(updateEvent);
    });

    useEffect(() =>
    {
        if (!roomSession) return;

        const roomEngine = GetRoomEngine();
        const roomId = roomSession.roomId;
        const canvasId = 1;
        const width = Math.floor(window.innerWidth);
        const height = Math.floor(window.innerHeight);
        const renderer = GetRenderer();

        if (renderer) renderer.resize(width, height);

        const displayObject = roomEngine.getRoomInstanceDisplay(roomId, canvasId, width, height, RoomGeometry.SCALE_ZOOMED_IN);
        const canvas = GetRoomEngine().getRoomInstanceRenderingCanvas(roomId, canvasId);

        if (!displayObject || !canvas) return;

        const background = new NitroSprite(NitroTexture.WHITE);
        const filter = new NitroAdjustmentFilter();
        const master = canvas.master;

        background.tint = 0;
        background.width = width;
        background.height = height;

        master.addChildAt(background, 0);
        master.filters = [filter];

        roomBackground.current = background;
        roomFilter.current = filter;

        const geometry = (roomEngine.getRoomInstanceGeometry(roomId, canvasId) as RoomGeometry);

        if (geometry)
        {
            const minX = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MIN_X) || 0);
            const maxX = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MAX_X) || 0);
            const minY = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MIN_Y) || 0);
            const maxY = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MAX_Y) || 0);

            let x = ((minX + maxX) / 2);
            let y = ((minY + maxY) / 2);

            const offset = 20;

            x = (x + (offset - 1));
            y = (y + (offset - 1));

            const z = (Math.sqrt(((offset * offset) + (offset * offset))) * Math.tan(((30 / 180) * Math.PI)));

            geometry.location = new Vector3d(x, y, z);
        }

        GetStage().addChild(displayObject);

        SetActiveRoomId(roomSession.roomId);

        const resize = (event: UIEvent) =>
        {
            const width = Math.floor(window.innerWidth);
            const height = Math.floor(window.innerHeight);

            background.width = width;
            background.height = height;

            InitializeRoomInstanceRenderingCanvas(width, height, 1);

            renderer.resize(width, height, window.devicePixelRatio);
            renderer.render(GetStage());
        };

        window.addEventListener('resize', resize);

        return () =>
        {
            roomBackground.current = null;
            roomFilter.current = null;
            //setOriginalRoomBackgroundColor(0);

            window.removeEventListener('resize', resize);
        };
    }, [roomSession]);
};

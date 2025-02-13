import { CanManipulateFurniture, GetRoomSession, IsFurnitureSelectionDisabled, ProcessRoomObjectOperation, RoomWidgetUpdateRoomObjectEvent, SetActiveRoomId, StartRoomSession } from '#base/api';
import { useEventStore, useRoomStore } from '#base/stores';
import { RoomEngineEvent, RoomEngineObjectEvent, RoomId, RoomObjectCategory, RoomObjectOperationType, RoomSessionEvent } from '@nitrodevco/nitro-renderer';
import { useEventListener } from '../events';

export const useRoomMessages = () =>
{
    const roomSession = useRoomStore(state => state.roomSession);
    const setRoomSession = useRoomStore(state => state.setRoomSession);
    const emit = useEventStore(state => state.emit);

    useEventListener<RoomEngineEvent>([
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

    useEventListener<RoomSessionEvent>([
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

    useEventListener<RoomEngineObjectEvent>([
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

        if (updateEvent) emit(updateEvent);
    });
};

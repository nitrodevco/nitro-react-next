import { CreateRoomSession, DoorStateType, SendMessageComposer, TryVisitRoom, VisitDesktop } from '#base/api';
import { useNavigatorStore, useSessionStore } from '#base/stores';
import { CanCreateRoomEventEvent, CantConnectMessageParser, CreateLinkEvent, DoorbellMessageEvent, FlatAccessDeniedMessageEvent, FlatCreatedEvent, FollowFriendMessageComposer, GenericErrorEvent, GetGuestRoomMessageComposer, GetGuestRoomResultEvent, GetUserEventCatsMessageComposer, GetUserFlatCatsMessageComposer, NavigatorHomeRoomEvent, NavigatorMetadataEvent, NavigatorOpenRoomCreatorEvent, NavigatorSearchEvent, NoobnessLevelEnum, RoomDataParser, RoomDoorbellAcceptedEvent, RoomEnterErrorEvent, RoomEntryInfoMessageEvent, RoomForwardEvent, RoomScoreEvent, RoomSettingsUpdatedEvent, SecurityLevel, UserEventCatsEvent, UserFlatCatsEvent, UserInfoEvent, UserPermissionsEvent } from '@nitrodevco/nitro-renderer';
import { useShallow } from 'zustand/shallow';
import { useMessageEvent } from '../events';
import { useConfig } from '../utils';

let HOMEROOM_RECEIVED = false;

export const useNavigatorMessages = () =>
{
    const [
        setCategories,
        setEventCategories,
        setTopLevelContext,
        setTopLevelContextByCode,
        setTopLevelContexts,
        setDoorData,
        setSearchResult,
        setNavigatorData
    ] = useNavigatorStore(
        useShallow(state => [
            state.setCategories,
            state.setEventCategories,
            state.setTopLevelContext,
            state.setTopLevelContextByCode,
            state.setTopLevelContexts,
            state.setDoorData,
            state.setSearchResult,
            state.setNavigatorData]));
    const userName = useSessionStore(state => state.name);
    const isAmbassador = useSessionStore(state => state.isAmbassador);
    const isRealNoob = useSessionStore(state => state.noobnessLevel === NoobnessLevelEnum.REAL_NOOB);
    const isModerator = useSessionStore(state => state.securityLevel) >= SecurityLevel.MODERATOR;
    const config = useConfig();

    useMessageEvent<RoomSettingsUpdatedEvent>(RoomSettingsUpdatedEvent, event =>
    {
        const parser = event.getParser();

        SendMessageComposer(new GetGuestRoomMessageComposer(parser.roomId, false, false));
    });

    useMessageEvent<CanCreateRoomEventEvent>(CanCreateRoomEventEvent, event =>
    {
        const parser = event.getParser();

        if (parser.canCreate)
        {
            // show room event cvreate

            return;
        }

        // simpleAlert(LocalizeText(`navigator.cannotcreateevent.error.${ parser.errorCode }`), null, null, null, LocalizeText('navigator.cannotcreateevent.title'));
    });

    useMessageEvent<UserInfoEvent>(UserInfoEvent, event =>
    {
        SendMessageComposer(new GetUserFlatCatsMessageComposer());
        SendMessageComposer(new GetUserEventCatsMessageComposer());
    });

    useMessageEvent<UserPermissionsEvent>(UserPermissionsEvent, event =>
    {
        const parser = event.getParser();

        setNavigatorData({
            eventMod: (parser.securityLevel >= SecurityLevel.MODERATOR),
            roomPicker: (parser.securityLevel >= SecurityLevel.COMMUNITY)
        });
    });

    useMessageEvent<RoomForwardEvent>(RoomForwardEvent, event =>
    {
        const parser = event.getParser();

        TryVisitRoom(parser.roomId);
    });

    useMessageEvent<RoomEntryInfoMessageEvent>(RoomEntryInfoMessageEvent, event =>
    {
        const parser = event.getParser();

        setNavigatorData({
            enteredGuestRoom: null,
            currentRoomOwner: parser.isOwner,
            currentRoomId: parser.roomId
        });

        // close room info
        // close room settings
        // close room filter

        SendMessageComposer(new GetGuestRoomMessageComposer(parser.roomId, true, false));
    });

    useMessageEvent<GetGuestRoomResultEvent>(GetGuestRoomResultEvent, event =>
    {
        const parser = event.getParser();

        if (parser.roomEnter)
        {
            setDoorData({ roomInfo: null, state: DoorStateType.NONE });

            setNavigatorData({
                enteredGuestRoom: parser.data,
                currentRoomIsStaffPick: parser.staffPick,
            });

            if (parser.data && (parser.data.habboGroupId > 0))
            {
                // close event info
            }
        }
        else if (parser.roomForward)
        {
            if ((parser.data.ownerName !== userName) && !parser.isGroupMember)
            {
                switch (parser.data.doorMode)
                {
                    case RoomDataParser.DOORBELL_STATE:
                        setDoorData({
                            roomInfo: parser.data,
                            state: DoorStateType.START_DOORBELL
                        });
                        return;
                    case RoomDataParser.PASSWORD_STATE:
                        setDoorData({
                            roomInfo: parser.data,
                            state: DoorStateType.START_PASSWORD
                        });
                        return;
                }
            }

            if ((parser.data.doorMode === RoomDataParser.NOOB_STATE) && !isAmbassador && !isRealNoob && !isModerator) return;

            CreateRoomSession(parser.data.roomId);
        }
        else
        {
            setNavigatorData({
                enteredGuestRoom: parser.data,
                currentRoomIsStaffPick: parser.staffPick
            });
        }
    });

    useMessageEvent<RoomScoreEvent>(RoomScoreEvent, event =>
    {
        const parser = event.getParser();

        setNavigatorData({
            currentRoomRating: parser.totalLikes,
            canRate: parser.canLike
        });
    });

    useMessageEvent<DoorbellMessageEvent>(DoorbellMessageEvent, event =>
    {
        const parser = event.getParser();

        if (!parser.userName || (parser.userName.length === 0))
        {
            setDoorData({ state: DoorStateType.STATE_WAITING });
        }
    });

    useMessageEvent<RoomDoorbellAcceptedEvent>(RoomDoorbellAcceptedEvent, event =>
    {
        const parser = event.getParser();

        if (!parser.userName || (parser.userName.length === 0))
        {
            setDoorData({ state: DoorStateType.STATE_ACCEPTED });
        }
    });

    useMessageEvent<FlatAccessDeniedMessageEvent>(FlatAccessDeniedMessageEvent, event =>
    {
        const parser = event.getParser();

        if (!parser.userName || (parser.userName.length === 0))
        {
            setDoorData({ state: DoorStateType.STATE_NO_ANSWER });
        }
    });

    useMessageEvent<GenericErrorEvent>(GenericErrorEvent, event =>
    {
        const parser = event.getParser();

        switch (parser.errorCode)
        {
            case -100002:
                setDoorData({ state: DoorStateType.STATE_WRONG_PASSWORD });
                return;
            case 4009:
                // simpleAlert(LocalizeText('navigator.alert.need.to.be.vip'), NotificationAlertType.DEFAULT, null, null, LocalizeText('generic.alert.title'));

                return;
            case 4010:
                // simpleAlert(LocalizeText('navigator.alert.invalid_room_name'), NotificationAlertType.DEFAULT, null, null, LocalizeText('generic.alert.title'));

                return;
            case 4011:
                // simpleAlert(LocalizeText('navigator.alert.cannot_perm_ban'), NotificationAlertType.DEFAULT, null, null, LocalizeText('generic.alert.title'));

                return;
            case 4013:
                // simpleAlert(LocalizeText('navigator.alert.room_in_maintenance'), NotificationAlertType.DEFAULT, null, null, LocalizeText('generic.alert.title'));

                return;
        }
    });

    useMessageEvent<NavigatorMetadataEvent>(NavigatorMetadataEvent, event =>
    {
        const parser = event.getParser();

        setTopLevelContexts(parser.topLevelContexts);
        setTopLevelContext(parser.topLevelContexts.length ? parser.topLevelContexts[0] : null);
    });

    useMessageEvent<NavigatorSearchEvent>(NavigatorSearchEvent, event =>
    {
        const parser = event.getParser();

        setTopLevelContextByCode(parser.result.code);
        setSearchResult(parser.result);
    });

    useMessageEvent<UserFlatCatsEvent>(UserFlatCatsEvent, event =>
    {
        const parser = event.getParser();

        setCategories(parser.categories);
    });

    useMessageEvent<UserEventCatsEvent>(UserEventCatsEvent, event =>
    {
        const parser = event.getParser();

        setEventCategories(parser.categories);
    });

    useMessageEvent<FlatCreatedEvent>(FlatCreatedEvent, event =>
    {
        const parser = event.getParser();

        CreateRoomSession(parser.roomId);
    });

    useMessageEvent<NavigatorHomeRoomEvent>(NavigatorHomeRoomEvent, event =>
    {
        const parser = event.getParser();

        const prevHomeroomReceived = HOMEROOM_RECEIVED;

        setNavigatorData({
            homeRoomId: parser.homeRoomId,
        });

        if (prevHomeroomReceived)
        {
            // refresh room info window
            return;
        }

        HOMEROOM_RECEIVED = true;

        let friendId = config<string>('friend.id');
        let forwardId = config<string>('forward.id');
        let forwardType = config<string>('forward.type');

        let newForwardType = -1;
        let newForwardId = -1;

        if ((friendId !== undefined) && (parseInt(friendId) > 0))
        {
            newForwardType = 0;
            SendMessageComposer(new FollowFriendMessageComposer(parseInt(friendId)));
        }

        if ((forwardType !== undefined) && (forwardId !== undefined))
        {
            newForwardType = parseInt(forwardType);
            newForwardId = parseInt(forwardId);
        }

        if (newForwardType === 2)
        {
            TryVisitRoom(newForwardId);
        }

        else if ((newForwardType === -1) && (parser.roomIdToEnter > 0))
        {
            CreateLinkEvent('navigator/close');

            if (parser.roomIdToEnter !== parser.homeRoomId)
            {
                CreateRoomSession(parser.roomIdToEnter);
            }
            else
            {
                CreateRoomSession(parser.homeRoomId);
            }
        }
    });

    useMessageEvent<RoomEnterErrorEvent>(RoomEnterErrorEvent, event =>
    {
        const parser = event.getParser();

        switch (parser.reason)
        {
            case CantConnectMessageParser.REASON_FULL:
                // simpleAlert(LocalizeText('navigator.guestroomfull.text'), NotificationAlertType.DEFAULT, null, null, LocalizeText('navigator.guestroomfull.title'));

                break;
            case CantConnectMessageParser.REASON_QUEUE_ERROR:
                // simpleAlert(LocalizeText(`room.queue.error.${ parser.parameter }`), NotificationAlertType.DEFAULT, null, null, LocalizeText('room.queue.error.title'));

                break;
            case CantConnectMessageParser.REASON_BANNED:
                // simpleAlert(LocalizeText('navigator.banned.text'), NotificationAlertType.DEFAULT, null, null, LocalizeText('navigator.banned.title'));

                break;
            default:
                // simpleAlert(LocalizeText('room.queue.error.title'), NotificationAlertType.DEFAULT, null, null, LocalizeText('room.queue.error.title'));

                break;
        }

        VisitDesktop();
    });

    useMessageEvent<NavigatorOpenRoomCreatorEvent>(NavigatorOpenRoomCreatorEvent, event => CreateLinkEvent('navigator/show'));
};

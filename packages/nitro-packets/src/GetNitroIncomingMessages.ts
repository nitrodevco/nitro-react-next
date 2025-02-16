import { INitroIncomingPacket } from './api';
import { AvailabilityStatusMessage, AvailabilityTimeMessage, BotAddedToInventoryMessage, BotInventoryMessage, BotReceivedMessage, BotRemovedFromInventoryMessage, CameraPublishStatusMessage, CameraPurchaseOKMessage, CameraSnapshotMessage, CameraStorageUrlMessage, CfhSanctionMessage, CfhTopicsInitMessage, ChangeUserNameResultMessage, CompetitionStatusMessage, FigureUpdateMessage, HotelClosedAndOpensMessage, HotelClosesAndWillOpenAtMessage, HotelWillCloseInMinutesMessage, InitCameraMessage, InterstitialMessage, MaintenanceStatusMessage, RoomAdErrorMessage, SanctionStatusMessage, ThumbnailStatusMessage, WardrobeMessage } from './incoming';
import { IncomingHeader } from './IncomingHeader';

export const GetNitroIncomingMessages = () =>
{
    return {
        [IncomingHeader.INTERSTITIAL_MESSAGE]: InterstitialMessage,
        [IncomingHeader.ROOM_AD_ERROR]: RoomAdErrorMessage,
        [IncomingHeader.AVAILABILITY_STATUS]: AvailabilityStatusMessage,
        [IncomingHeader.AVAILABILITY_TIME]: AvailabilityTimeMessage,
        [IncomingHeader.HOTEL_CLOSED_AND_OPENS]: HotelClosedAndOpensMessage,
        [IncomingHeader.HOTEL_CLOSES_AND_OPENS_AT]: HotelClosesAndWillOpenAtMessage,
        [IncomingHeader.HOTEL_WILL_CLOSE_MINUTES]: HotelWillCloseInMinutesMessage,
        [IncomingHeader.HOTEL_MAINTENANCE]: MaintenanceStatusMessage,
        [IncomingHeader.USER_CHANGE_NAME]: ChangeUserNameResultMessage,
        [IncomingHeader.CHECK_USER_NAME]: ChangeUserNameResultMessage,
        [IncomingHeader.USER_FIGURE]: FigureUpdateMessage,
        [IncomingHeader.USER_OUTFITS]: WardrobeMessage,
        [IncomingHeader.ADD_BOT_TO_INVENTORY]: BotAddedToInventoryMessage,
        [IncomingHeader.USER_BOTS]: BotInventoryMessage,
        [IncomingHeader.BOT_RECEIVED]: BotReceivedMessage,
        [IncomingHeader.REMOVE_BOT_FROM_INVENTORY]: BotRemovedFromInventoryMessage,
        [IncomingHeader.CFH_SANCTION]: CfhSanctionMessage,
        [IncomingHeader.CFH_TOPICS]: CfhTopicsInitMessage,
        [IncomingHeader.CFH_SANCTION_STATUS]: SanctionStatusMessage,
        [IncomingHeader.CAMERA_PUBLISH_STATUS]: CameraPublishStatusMessage,
        [IncomingHeader.CAMERA_PURCHASE_OK]: CameraPurchaseOKMessage,
        [IncomingHeader.CAMERA_STORAGE_URL]: CameraStorageUrlMessage,
        [IncomingHeader.COMPETITION_STATUS]: CompetitionStatusMessage,
        [IncomingHeader.INIT_CAMERA]: InitCameraMessage,
        [IncomingHeader.THUMBNAIL_STATUS]: ThumbnailStatusMessage,
        [IncomingHeader.CAMERA_SNAPSHOT]: CameraSnapshotMessage
    } as Record<number, INitroIncomingPacket>;
}

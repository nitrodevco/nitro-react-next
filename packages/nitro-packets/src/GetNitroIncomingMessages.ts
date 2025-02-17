import { INitroIncomingPacket } from './api';
import { AvailabilityStatusMessage, AvailabilityTimeMessage, BotAddedToInventoryMessage, BotInventoryMessage, BotReceivedMessage, BotRemovedFromInventoryMessage, CameraPublishStatusMessage, CameraPurchaseOKMessage, CameraSnapshotMessage, CameraStorageUrlMessage, CampaignCalendarDataMessage, CampaignCalendarDoorOpenedMessage, CfhSanctionMessage, CfhTopicsInitMessage, ChangeUserNameResultMessage, ClientPingMessage, CompetitionEntrySubmitResultMessage, CompetitionStatusMessage, CompetitionVotingInfoMessage, CraftableProductsMessage, CraftingRecipeMessage, CraftingRecipesAvailableMessage, CraftingResultMessage, CurrentTimingCodeMessage, FigureUpdateMessage, HotelClosedAndOpensMessage, HotelClosesAndWillOpenAtMessage, HotelWillCloseInMinutesMessage, InitCameraMessage, InterstitialMessage, IsUserPartOfCompetitionMessage, MaintenanceStatusMessage, NoOwnedRoomsAlertMessage, RoomAdErrorMessage, SanctionStatusMessage, SecondsUntilMessage, ThumbnailStatusMessage, WardrobeMessage } from './incoming';
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
        [IncomingHeader.CAMERA_SNAPSHOT]: CameraSnapshotMessage,
        [IncomingHeader.CAMPAIGN_CALENDAR_DATA]: CampaignCalendarDataMessage,
        [IncomingHeader.CAMPAIGN_CALENDAR_DOOR_OPENED]: CampaignCalendarDoorOpenedMessage,
        [IncomingHeader.CLIENT_PING]: ClientPingMessage,
        [IncomingHeader.COMPETITION_ENTRY_SUBMIT]: CompetitionEntrySubmitResultMessage,
        [IncomingHeader.COMPETITION_VOTING_INFO]: CompetitionVotingInfoMessage,
        [IncomingHeader.COMPETITION_TIMING_CODE]: CurrentTimingCodeMessage,
        [IncomingHeader.COMPETITION_USER_PART_OF]: IsUserPartOfCompetitionMessage,
        [IncomingHeader.COMPETITION_NO_OWNED_ROOMS]: NoOwnedRoomsAlertMessage,
        [IncomingHeader.COMPETITION_SECONDS_UNTIL]: SecondsUntilMessage,
        [IncomingHeader.CRAFTABLE_PRODUCTS]: CraftableProductsMessage,
        [IncomingHeader.CRAFTING_RECIPE]: CraftingRecipeMessage,
        [IncomingHeader.CRAFTING_RECIPES_AVAILABLE]: CraftingRecipesAvailableMessage,
        [IncomingHeader.CRAFTING_RESULT]: CraftingResultMessage
    } as Record<number, INitroIncomingPacket>;
}

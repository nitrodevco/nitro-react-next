import { INitroIncomingPacket } from './api';
import { AcceptFriendResultMessage, AvailabilityStatusMessage, AvailabilityTimeMessage, BonusRareInfoMessage, BotAddedToInventoryMessage, BotInventoryMessage, BotReceivedMessage, BotRemovedFromInventoryMessage, BuildersClubFurniCountMessage, BuildersClubSubscriptionStatusMessage, BundleDiscountRulesetMessage, CameraPublishStatusMessage, CameraPurchaseOKMessage, CameraSnapshotMessage, CameraStorageUrlMessage, CampaignCalendarDataMessage, CampaignCalendarDoorOpenedMessage, CatalogIndexMessage, CatalogPageExpirationMessage, CatalogPageMessage, CatalogPageWithEarliestExpiryMessage, CatalogPublishedMessage, CfhSanctionMessage, CfhTopicsInitMessage, ChangeUserNameResultMessage, ClientPingMessage, ClubGiftInfoMessage, ClubGiftSelectedMessage, CompetitionEntrySubmitResultMessage, CompetitionStatusMessage, CompetitionVotingInfoMessage, CompleteDiffieHandshakeMessage, CraftableProductsMessage, CraftingRecipeMessage, CraftingRecipesAvailableMessage, CraftingResultMessage, CurrentTimingCodeMessage, DesktopViewMessage, DirectSMSClubBuyAvailableMessage, DisconnectReasonMessage, FigureUpdateMessage, FindFriendsProcessResultMessage, FollowFriendFailedMessage, FriendListFragmentMessage, FriendListUpdateMessage, FriendNotificationMessage, FriendRequestsMessage, GenericErrorMessage, GetForumsListMessage, GiftReceiverNotFoundMessage, GiftWrappingConfigurationMessage, GroupBadgePartsMessage, GroupBuyDataMessage, GroupConfirmMemberRemoveMessage, GroupInformationMessage, GroupMembersMessage, GroupPurchasedMessage, GroupSettingsMessage, GuildForumThreadsMessage, HabboClubExtendOfferMessage, HabboClubOffersMessage, HabboGroupDeactivatedMessage, HabboSearchResultMessage, HotelClosedAndOpensMessage, HotelClosesAndWillOpenAtMessage, HotelWillCloseInMinutesMessage, IdentityAccountsMessage, InitCameraMessage, InitDiffieHandshakeMessage, InstantMessageErrorMessage, InterstitialMessage, IsOfferGiftableMessage, IsUserPartOfCompetitionMessage, LimitedEditionSoldOutMessage, LimitedOfferAppearingNextMessage, MaintenanceStatusMessage, MessageErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessage, NewFriendRequestMessage, NoobnessLevelMessage, NoOwnedRoomsAlertMessage, NotEnoughBalanceMessage, PhoneCollectionStateMessage, PostMessageMessage, PostThreadMessage, ProductOfferMessage, PurchaseErrorMessage, PurchaseNotAllowedMessage, PurchaseOKMessage, RoomAdErrorMessage, RoomAdPurchaseInfoMessage, RoomInviteErrorMessage, RoomInviteMessage, SanctionStatusMessage, SeasonalCalendarDailyOfferMessage, SecondsUntilMessage, SellablePetPalettesMessage, TargetedOfferMessage, TargetedOfferNotFoundMessage, ThreadMessagesMessage, ThumbnailStatusMessage, TryPhoneNumberResultMessage, TryVerificationCodeResultMessage, UnreadForumsCountMessage, UpdateMessageMessage, UpdateThreadMessage, VoucherRedeemErrorMessage, VoucherRedeemOkMessage, WardrobeMessage } from './incoming';
import { ForumDataMessage } from './incoming/groupforums/ForumDataMessage';
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
        [IncomingHeader.BONUS_RARE_INFO]: BonusRareInfoMessage,
        [IncomingHeader.BUILDERS_CLUB_FURNI_COUNT]: BuildersClubFurniCountMessage,
        [IncomingHeader.BUILDERS_CLUB_SUBSCRIPTION]: BuildersClubSubscriptionStatusMessage,
        [IncomingHeader.BUNDLE_DISCOUNT_RULESET]: BundleDiscountRulesetMessage,
        [IncomingHeader.CATALOG_PAGE_EXPIRATION]: CatalogPageExpirationMessage,
        [IncomingHeader.CATALOG_PAGE]: CatalogPageMessage,
        [IncomingHeader.CATALOG_PAGE_LIST]: CatalogIndexMessage,
        [IncomingHeader.CATALOG_EARLIEST_EXPIRY]: CatalogPageWithEarliestExpiryMessage,
        [IncomingHeader.CATALOG_PUBLISHED]: CatalogPublishedMessage,
        [IncomingHeader.CLUB_GIFT_INFO]: ClubGiftInfoMessage,
        [IncomingHeader.CLUB_GIFT_SELECTED]: ClubGiftSelectedMessage,
        [IncomingHeader.DIRECT_SMS_CLUB_BUY]: DirectSMSClubBuyAvailableMessage,
        [IncomingHeader.GIFT_RECEIVER_NOT_FOUND]: GiftReceiverNotFoundMessage,
        [IncomingHeader.GIFT_WRAPPER_CONFIG]: GiftWrappingConfigurationMessage,
        [IncomingHeader.CLUB_EXTENDED_OFFER]: HabboClubExtendOfferMessage,
        [IncomingHeader.CLUB_OFFERS]: HabboClubOffersMessage,
        [IncomingHeader.IS_OFFER_GIFTABLE]: IsOfferGiftableMessage,
        [IncomingHeader.LIMITED_SOLD_OUT]: LimitedEditionSoldOutMessage,
        [IncomingHeader.LIMITED_OFFER_APPEARING_NEXT]: LimitedOfferAppearingNextMessage,
        [IncomingHeader.NOT_ENOUGH_BALANCE]: NotEnoughBalanceMessage,
        [IncomingHeader.PRODUCT_OFFER]: ProductOfferMessage,
        [IncomingHeader.CATALOG_PURCHASE_ERROR]: PurchaseErrorMessage,
        [IncomingHeader.CATALOG_PURCHASE_NOT_ALLOWED]: PurchaseNotAllowedMessage,
        [IncomingHeader.CATALOG_PURCHASE_OK]: PurchaseOKMessage,
        [IncomingHeader.ROOM_AD_PURCHASE]: RoomAdPurchaseInfoMessage,
        [IncomingHeader.SEASONAL_CALENDAR_OFFER]: SeasonalCalendarDailyOfferMessage,
        [IncomingHeader.CATALOG_RECEIVE_PET_BREEDS]: SellablePetPalettesMessage,
        [IncomingHeader.TARGET_OFFER]: TargetedOfferMessage,
        [IncomingHeader.TARGET_OFFER_NOT_FOUND]: TargetedOfferNotFoundMessage,
        [IncomingHeader.REDEEM_VOUCHER_ERROR]: VoucherRedeemErrorMessage,
        [IncomingHeader.REDEEM_VOUCHER_OK]: VoucherRedeemOkMessage,
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
        [IncomingHeader.CRAFTING_RESULT]: CraftingResultMessage,
        [IncomingHeader.DESKTOP_VIEW]: DesktopViewMessage,
        [IncomingHeader.MESSENGER_ACCEPT_FRIENDS]: AcceptFriendResultMessage,
        [IncomingHeader.MESSENGER_FIND_FRIENDS]: FindFriendsProcessResultMessage,
        [IncomingHeader.MESSENGER_FOLLOW_FAILED]: FollowFriendFailedMessage,
        [IncomingHeader.MESSENGER_FRIENDS]: FriendListFragmentMessage,
        [IncomingHeader.MESSENGER_UPDATE]: FriendListUpdateMessage,
        [IncomingHeader.MESSENGER_FRIEND_NOTIFICATION]: FriendNotificationMessage,
        [IncomingHeader.MESSENGER_REQUESTS]: FriendRequestsMessage,
        [IncomingHeader.MESSENGER_SEARCH]: HabboSearchResultMessage,
        [IncomingHeader.MESSENGER_INSTANCE_MESSAGE_ERROR]: InstantMessageErrorMessage,
        [IncomingHeader.MESSENGER_MESSAGE_ERROR]: MessageErrorMessage,
        [IncomingHeader.MESSENGER_INIT]: MessengerInitMessage,
        [IncomingHeader.MESSENGER_MINIMAIL_NEW]: MiniMailNewMessage,
        [IncomingHeader.MESSENGER_MINIMAIL_COUNT]: MiniMailUnreadCountMessage,
        [IncomingHeader.MESSENGER_CHAT]: NewConsoleMessage,
        [IncomingHeader.MESSENGER_REQUEST]: NewFriendRequestMessage,
        [IncomingHeader.MESSENGER_INVITE_ERROR]: RoomInviteErrorMessage,
        [IncomingHeader.MESSENGER_INVITE]: RoomInviteMessage,
        [IncomingHeader.GENERIC_ERROR]: GenericErrorMessage,
        [IncomingHeader.PHONE_COLLECTION_STATE]: PhoneCollectionStateMessage,
        [IncomingHeader.PHONE_TRY_NUMBER_RESULT]: TryPhoneNumberResultMessage,
        [IncomingHeader.PHONE_TRY_VERIFICATION_CODE_RESULT]: TryVerificationCodeResultMessage,
        [IncomingHeader.GROUP_BADGE_PARTS]: GroupBadgePartsMessage,
        [IncomingHeader.GROUP_CREATE_OPTIONS]: GroupBuyDataMessage,
        [IncomingHeader.GROUP_MEMBER_REMOVE_CONFIRM]: GroupConfirmMemberRemoveMessage,
        [IncomingHeader.GROUP_INFO]: GroupInformationMessage,
        [IncomingHeader.GROUP_MEMBERS]: GroupMembersMessage,
        [IncomingHeader.GROUP_PURCHASED]: GroupPurchasedMessage,
        [IncomingHeader.GROUP_SETTINGS]: GroupSettingsMessage,
        [IncomingHeader.GROUP_DEACTIVATE]: HabboGroupDeactivatedMessage,
        //[IncomingHeader.GROUP_BADGES]: HabboGroupBadgesMessage,
        //[IncomingHeader.GROUP_MEMBERSHIP_REQUESTED]: GroupMembershipRequestedMessage,
        //[IncomingHeader.GROUP_DETAILS_CHANGED]: GroupDetailsChangedMessageEvent,
        //[IncomingHeader.GROUP_HABBO_JOIN_FAILED]: HabboGroupJoinFailedMessageEvent,
        [IncomingHeader.GROUP_FORUM_DATA]: ForumDataMessage,
        [IncomingHeader.GROUP_FORUM_LIST]: GetForumsListMessage,
        [IncomingHeader.GROUP_FORUM_THREADS]: GuildForumThreadsMessage,
        [IncomingHeader.GROUP_FORUM_POST]: PostMessageMessage,
        [IncomingHeader.GROUP_FORUM_POST_THREAD]: PostThreadMessage,
        [IncomingHeader.GROUP_FORUM_THREAD_MESSAGES]: ThreadMessagesMessage,
        [IncomingHeader.GROUP_FORUM_UNREAD_COUNT]: UnreadForumsCountMessage,
        [IncomingHeader.GROUP_FORUM_UPDATE_MESSAGE]: UpdateMessageMessage,
        [IncomingHeader.GROUP_FORUM_UPDATE_THREAD]: UpdateThreadMessage,
        [IncomingHeader.HANDSHAKE_COMPLETE_DIFFIE]: CompleteDiffieHandshakeMessage,
        [IncomingHeader.DISCONNECT_REASON]: DisconnectReasonMessage,
        [IncomingHeader.HANDSHAKE_IDENTITY_ACCOUNT]: IdentityAccountsMessage,
        [IncomingHeader.HANDSHAKE_INIT_DIFFIE]: InitDiffieHandshakeMessage,
        [IncomingHeader.NOOBNESS_LEVEL]: NoobnessLevelMessage
    } as Record<number, INitroIncomingPacket>;
}

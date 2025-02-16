import { INitroIncomingPacket } from './api';
import { AvailabilityStatusMessage, AvailabilityTimeMessage, HotelClosedAndOpensMessage, HotelClosesAndWillOpenAtMessage, HotelWillCloseInMinutesMessage, InterstitialMessage, MaintenanceStatusMessage, RoomAdErrorMessage } from './incoming';
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
    } as Record<number, INitroIncomingPacket>;
}

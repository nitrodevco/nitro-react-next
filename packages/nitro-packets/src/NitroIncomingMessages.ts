import { INitroIncomingPacket } from './api';
import { InterstitialMessageEvent } from './incoming';
import { IncomingHeader } from './IncomingHeader';

export const GetNitroIncomingMessages = () =>
{
    return {
        [IncomingHeader.INTERSTITIAL_MESSAGE]: InterstitialMessageEvent
    } as Record<number, INitroIncomingPacket>;
}

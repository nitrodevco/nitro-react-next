import { INitroIncomingPacket } from '#packets/api';

type InterstitialMessageEventType = {
    canShowInterstitial: boolean;
}

export const InterstitialMessageEvent: INitroIncomingPacket<InterstitialMessageEventType> = wrapper =>
{
    const packet = {} as InterstitialMessageEventType;

    packet.canShowInterstitial = wrapper.readBoolean();

    return packet;
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type InterstitialMessageType = {
    canShowInterstitial: boolean;
};

export const InterstitialMessage: IIncomingPacket<InterstitialMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: InterstitialMessageType = {
        canShowInterstitial: wrapper.readBoolean()
    };

    return packet;
};

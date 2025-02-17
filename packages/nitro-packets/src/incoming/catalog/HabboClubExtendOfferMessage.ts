import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HabboClubExtendOfferMessageType = {

};

export const HabboClubExtendOfferMessage: IIncomingPacket<HabboClubExtendOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboClubExtendOfferMessageType = {
        offer: null,
    };



    return packet;
};
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HabboClubOffersMessageType = {

};

export const HabboClubOffersMessage: IIncomingPacket<HabboClubOffersMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboClubOffersMessageType = {
        offers: [],
    };



    return packet;
};
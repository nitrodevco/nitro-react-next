import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ClubGiftInfoParserType = {
    daysUntilNextGift: number;
    giftsAvailable: number;
};

export const ClubGiftInfoParser: IIncomingPacket<ClubGiftInfoParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ClubGiftInfoParserType = {

    };

    packet.daysUntilNextGift = wrapper.readInt();
    packet.giftsAvailable = wrapper.readInt();

    return packet;
};
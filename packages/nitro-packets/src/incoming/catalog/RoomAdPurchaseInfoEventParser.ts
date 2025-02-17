import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomAdPurchaseInfoEventParserType = {
    isVip: boolean;
};

export const RoomAdPurchaseInfoEventParser: IIncomingPacket<RoomAdPurchaseInfoEventParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomAdPurchaseInfoEventParserType = {
        isVip: false,
        rooms: [],
    };

    packet.isVip = wrapper.readBoolean();

    return packet;
};
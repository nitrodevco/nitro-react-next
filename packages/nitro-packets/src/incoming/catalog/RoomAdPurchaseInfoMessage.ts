import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomEntryData } from './IRoomEntryData';
import { RoomEntryDataParser } from './RoomEntryDataParser';

type RoomAdPurchaseInfoMessageType = {
    isVip: boolean;
    rooms: IRoomEntryData[];
};

export const RoomAdPurchaseInfoMessage: IIncomingPacket<RoomAdPurchaseInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomAdPurchaseInfoMessageType = {
        isVip: wrapper.readBoolean(),
        rooms: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.rooms.push(RoomEntryDataParser(wrapper));

        count--;
    }

    return packet;
};

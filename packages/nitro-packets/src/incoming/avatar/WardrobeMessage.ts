import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IOutfitData } from './IOutfitData';
import { OutfitParser } from './OutfitDataParser';

type WardrobeMessageType = {
    state: number;
    outfits: IOutfitData[];
};

export const WardrobeMessage: IIncomingPacket<WardrobeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: WardrobeMessageType = {
        state: wrapper.readInt(),
        outfits: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.outfits.push(OutfitParser(wrapper));

        count--;
    }

    return packet;
};

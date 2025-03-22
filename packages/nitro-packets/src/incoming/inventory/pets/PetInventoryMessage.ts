import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPetData } from './IPetData';
import { PetDataParser } from './PetDataParser';

type PetInventoryMessageType = {
    totalFragments: number;
    fragmentNumber: number;
    fragment: Record<number, IPetData>;
};

export const PetInventoryMessage: IIncomingPacket<PetInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetInventoryMessageType = {
        totalFragments: wrapper.readInt(),
        fragmentNumber: wrapper.readInt(),
        fragment: {},
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const petData = PetDataParser(wrapper);

        packet.fragment[petData.id] = petData;

        count--;
    }

    return packet;
};

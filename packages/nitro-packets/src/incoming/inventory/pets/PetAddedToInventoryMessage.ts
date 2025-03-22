import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPetData } from './IPetData';
import { PetDataParser } from './PetDataParser';

type PetAddedToInventoryMessageType = {
    pet: IPetData;
    boughtAsGift: boolean;
};

export const PetAddedToInventoryMessage: IIncomingPacket<PetAddedToInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetAddedToInventoryMessageType = {
        pet: PetDataParser(wrapper),
        boughtAsGift: wrapper.readBoolean()
    };

    return packet;
};

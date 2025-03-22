import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type PetRemovedFromInventoryMessageType = {
    petId: number;
};

export const PetRemovedFromInventoryMessage: IIncomingPacket<PetRemovedFromInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetRemovedFromInventoryMessageType = {
        petId: wrapper.readInt()
    };

    return packet;
};

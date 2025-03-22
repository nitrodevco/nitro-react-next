import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { PetBreedingStateEnum } from './PetBreedingStateEnum';

type PetBreedingMessageType = {
    state: PetBreedingStateEnum;
    ownPetId: number;
    otherPetId: number;
};

export const PetBreedingMessage: IIncomingPacket<PetBreedingMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetBreedingMessageType = {
        state: wrapper.readInt() as PetBreedingStateEnum,
        ownPetId: wrapper.readInt(),
        otherPetId: wrapper.readInt()
    };

    return packet;
};

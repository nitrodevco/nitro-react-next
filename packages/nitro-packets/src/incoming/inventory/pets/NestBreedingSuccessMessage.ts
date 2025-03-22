import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NestBreedingSuccessMessageType = {
    petId: number;
    rarityCategory: number;
};

export const NestBreedingSuccessMessage: IIncomingPacket<NestBreedingSuccessMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NestBreedingSuccessMessageType = {
        petId: wrapper.readInt(),
        rarityCategory: wrapper.readInt()
    };

    return packet;
};

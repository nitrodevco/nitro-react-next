import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ConfirmBreedingResultMessageType = {
    breedingNestStuffId: number;
    result: number;
};

export const ConfirmBreedingResultMessage: IIncomingPacket<ConfirmBreedingResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ConfirmBreedingResultMessageType = {
        breedingNestStuffId: wrapper.readInt(),
        result: wrapper.readInt()
    };

    return packet;
};

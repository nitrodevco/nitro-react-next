import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BreedingNestFailureEnum } from './BreedingNestFailureEnum';

type GoToBreedingNestFailureMessageType = {
    reason: BreedingNestFailureEnum;
};

export const GoToBreedingNestFailureMessage: IIncomingPacket<GoToBreedingNestFailureMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GoToBreedingNestFailureMessageType = {
        reason: wrapper.readInt() as BreedingNestFailureEnum
    };

    return packet;
};

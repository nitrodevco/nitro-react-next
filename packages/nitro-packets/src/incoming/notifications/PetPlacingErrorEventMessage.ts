import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { PetPlacingErrorCodeEnum } from './PetPlacingErrorCodeEnum';

type PetPlacingErrorEventMessageType = {
    errorCode: PetPlacingErrorCodeEnum;
};

export const PetPlacingErrorEventMessage: IIncomingPacket<PetPlacingErrorEventMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetPlacingErrorEventMessageType = {
        errorCode: wrapper.readInt() as PetPlacingErrorCodeEnum
    };

    return packet;
};

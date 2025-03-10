import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { GuideSessionErrorEnum } from './GuideSessionErrorEnum';

type GuideSessionErrorMessageType = {
    errorCode: GuideSessionErrorEnum;
};

export const GuideSessionErrorMessage: IIncomingPacket<GuideSessionErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionErrorMessageType = {
        errorCode: wrapper.readInt()
    };

    return packet;
};

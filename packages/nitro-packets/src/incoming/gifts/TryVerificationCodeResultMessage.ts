import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TryVerificationCodeResultMessageType = {
    resultCode: number;
    millisecondsToAllowProcessReset: number;
};

export const TryVerificationCodeResultMessage: IIncomingPacket<TryVerificationCodeResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TryVerificationCodeResultMessageType = {
        resultCode: wrapper.readInt(),
        millisecondsToAllowProcessReset: wrapper.readInt()
    };

    return packet;
};

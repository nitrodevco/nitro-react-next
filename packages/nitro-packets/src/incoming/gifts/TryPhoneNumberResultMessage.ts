import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TryPhoneNumberResultMessageType = {
    resultCode: number;
    millisToAllowProcessReset: number;
};

export const TryPhoneNumberResultMessage: IIncomingPacket<TryPhoneNumberResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TryPhoneNumberResultMessageType = {
        resultCode: wrapper.readInt(),
        millisToAllowProcessReset: wrapper.readInt()
    };

    return packet;
};

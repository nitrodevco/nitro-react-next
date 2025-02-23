import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type VoucherRedeemErrorMessageType = {
    errorCode: string;
};

export const VoucherRedeemErrorMessage: IIncomingPacket<VoucherRedeemErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: VoucherRedeemErrorMessageType = {
        errorCode: wrapper.readString()
    };

    return packet;
};

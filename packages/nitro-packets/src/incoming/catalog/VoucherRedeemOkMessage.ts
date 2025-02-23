import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type VoucherRedeemOkMessageType = {
    productDescription: string;
    productName: string;
};

export const VoucherRedeemOkMessage: IIncomingPacket<VoucherRedeemOkMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: VoucherRedeemOkMessageType = {
        productDescription: wrapper.readString(),
        productName: wrapper.readString()
    };

    return packet;
};

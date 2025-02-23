import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type PurchaseErrorMessageType = {
    code: number;
};

export const PurchaseErrorMessage: IIncomingPacket<PurchaseErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PurchaseErrorMessageType = {
        code: wrapper.readInt()
    };

    return packet;
};

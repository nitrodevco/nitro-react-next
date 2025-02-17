import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type PurchaseNotAllowedMessageType = {
    code: number;
};

export const PurchaseNotAllowedMessage: IIncomingPacket<PurchaseNotAllowedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PurchaseNotAllowedMessageType = {
        code: 0,
    };

    packet.code = wrapper.readInt();

    return packet;
};
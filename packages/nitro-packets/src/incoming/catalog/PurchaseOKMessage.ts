import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type PurchaseOKMessageType = {

};

export const PurchaseOKMessage: IIncomingPacket<PurchaseOKMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PurchaseOKMessageType = {
        offer: null,
    };



    return packet;
};
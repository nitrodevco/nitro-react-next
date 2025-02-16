import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraPurchaseOKMessageType = {
};

export const CameraPurchaseOKMessage: IIncomingPacket<CameraPurchaseOKMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraPurchaseOKMessageType = {};

    return packet;
};

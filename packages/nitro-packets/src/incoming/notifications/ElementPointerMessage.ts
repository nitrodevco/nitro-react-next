import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ElementPointerMessageType = {
    key: string;
};

export const ElementPointerMessage: IIncomingPacket<ElementPointerMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ElementPointerMessageType = {
        key: wrapper.readString()
    };

    return packet;
};

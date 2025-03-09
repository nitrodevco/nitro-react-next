import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NoobnessLevelMessageType = {
    noobnessLevel: number;
};

export const NoobnessLevelMessage: IIncomingPacket<NoobnessLevelMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NoobnessLevelMessageType = {
        noobnessLevel: wrapper.readInt()
    };

    return packet;
};

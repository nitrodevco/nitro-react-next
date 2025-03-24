import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MysteryBoxKeysMessageType = {
    boxColor: string;
    keyColor: string;
};

export const MysteryBoxKeysMessage: IIncomingPacket<MysteryBoxKeysMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MysteryBoxKeysMessageType = {
        boxColor: wrapper.readString(),
        keyColor: wrapper.readString(),
    };

    return packet;
};

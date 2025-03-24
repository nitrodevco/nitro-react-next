import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GotMysteryBoxPrizeMessageType = {
    contentType: string;
    classId: number;
};

export const GotMysteryBoxPrizeMessage: IIncomingPacket<GotMysteryBoxPrizeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GotMysteryBoxPrizeMessageType = {
        contentType: wrapper.readString(),
        classId: wrapper.readInt()
    };

    return packet;
};

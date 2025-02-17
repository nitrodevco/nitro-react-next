import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type SecondsUntilMessageType = {
    timeStr: string;
    secondsUntil: number;
};

export const SecondsUntilMessage: IIncomingPacket<SecondsUntilMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SecondsUntilMessageType = {
        timeStr: wrapper.readString(),
        secondsUntil: wrapper.readInt()
    };

    return packet;
};

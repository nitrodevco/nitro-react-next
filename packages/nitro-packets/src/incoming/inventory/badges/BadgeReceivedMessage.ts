import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BadgeReceivedMessageType = {
    badgeId: number;
    badgeCode: string;
};

export const BadgeReceivedMessage: IIncomingPacket<BadgeReceivedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BadgeReceivedMessageType = {
        badgeId: wrapper.readInt(),
        badgeCode: wrapper.readString()
    };

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ClubGiftNotificationMessageType = {
    numGifts: number;
};

export const ClubGiftNotificationMessage: IIncomingPacket<ClubGiftNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ClubGiftNotificationMessageType = {
        numGifts: wrapper.readInt()
    };

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomInviteErrorMessageType = {
    errorCode: number;
    failedRecipients: number[];
};

export const RoomInviteErrorMessage: IIncomingPacket<RoomInviteErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomInviteErrorMessageType = {
        errorCode: wrapper.readInt(),
        failedRecipients: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.failedRecipients.push(wrapper.readInt());

        count--;
    }

    return packet;
};

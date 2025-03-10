import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type IssueCloseNotificationMessageType = {
    closeReason: number;
    messageText: string;
};

export const IssueCloseNotificationMessage: IIncomingPacket<IssueCloseNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IssueCloseNotificationMessageType = {
        closeReason: wrapper.readInt(),
        messageText: wrapper.readString()
    };

    return packet;
};

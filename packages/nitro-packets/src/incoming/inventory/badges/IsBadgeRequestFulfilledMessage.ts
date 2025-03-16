import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type IsBadgeRequestFulfilledMessageType = {
    requestCode: string;
    fulfilled: boolean;
};

export const IsBadgeRequestFulfilledMessage: IIncomingPacket<IsBadgeRequestFulfilledMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IsBadgeRequestFulfilledMessageType = {
        requestCode: wrapper.readString(),
        fulfilled: wrapper.readBoolean()
    };

    return packet;
};

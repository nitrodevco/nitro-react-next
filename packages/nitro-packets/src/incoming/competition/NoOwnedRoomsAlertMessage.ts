import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NoOwnedRoomsAlertMessageType = {

};

export const NoOwnedRoomsAlertMessage: IIncomingPacket<NoOwnedRoomsAlertMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NoOwnedRoomsAlertMessageType = {};

    return packet;
};

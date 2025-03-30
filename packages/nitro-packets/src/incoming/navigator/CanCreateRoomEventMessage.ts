import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CreateRoomEventErrorEnum } from './CreateRoomEventErrorEnum';

type CanCreateRoomEventMessageType = {
    canCreate: boolean;
    errorCode: CreateRoomEventErrorEnum;
};

export const CanCreateRoomEventMessage: IIncomingPacket<CanCreateRoomEventMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CanCreateRoomEventMessageType = {
        canCreate: wrapper.readBoolean(),
        errorCode: wrapper.readInt() as CreateRoomEventErrorEnum
    };

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CreateRoomResultEnum } from './CreateRoomResultEnum';

type CanCreateRoomMessageType = {
    resultCode: CreateRoomResultEnum;
    roomLimit: number;
};

export const CanCreateRoomMessage: IIncomingPacket<CanCreateRoomMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CanCreateRoomMessageType = {
        resultCode: wrapper.readInt() as CreateRoomResultEnum,
        roomLimit: wrapper.readInt()
    };

    return packet;
};

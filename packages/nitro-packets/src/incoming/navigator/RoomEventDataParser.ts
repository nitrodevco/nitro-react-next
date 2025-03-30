import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomEventData } from './IRoomEventData';

export const RoomEventDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomEventData = {
        adId: wrapper.readInt(),
        ownerAvatarId: wrapper.readInt(),
        ownerAvatarName: wrapper.readString(),
        flatId: wrapper.readInt(),
        eventType: wrapper.readInt(),
        eventName: wrapper.readString(),
        eventDescription: wrapper.readString(),
        creationDate: null,
        expirationDate: null,
        categoryId: -1
    };

    const creationOffsetMinutes = wrapper.readInt();
    const expirationOffsetMinutes = wrapper.readInt();
    const currentTime = new Date();

    packet.creationDate = new Date(currentTime.getTime() - creationOffsetMinutes * 60 * 1000);
    packet.expirationDate = new Date(currentTime.getTime() + expirationOffsetMinutes * 60 * 1000);
    packet.categoryId = wrapper.readInt();

    return packet;
}

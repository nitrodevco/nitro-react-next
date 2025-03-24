import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IModRoomData } from './IModRoomData';

export const ModRoomDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        exists: wrapper.readBoolean(),
        tags: []
    } as IModRoomData;

    if (wrapper.bytesAvailable)
    {
        packet.name = wrapper.readString();
        packet.desc = wrapper.readString();

        let count = wrapper.readInt();

        while (count > 0)
        {
            packet.tags.push(wrapper.readString());

            count--;
        }
    }

    return packet;
}

import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IGroupBadgePartData } from './IGroupBadgePartData';

export const GroupBadgePartDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IGroupBadgePartData = {
        isBase: false,
        key: wrapper.readInt(),
        color: wrapper.readInt(),
        position: wrapper.readInt()
    }

    if (packet.key === 0) packet.position = 4;

    return packet;
}

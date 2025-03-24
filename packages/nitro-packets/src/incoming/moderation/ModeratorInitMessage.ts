import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IModeratorInitData } from './IModeratorInitData';
import { ModeratorInitDataParser } from './ModeratorInitDataParser';

type ModeratorInitMessageType = {
    data: IModeratorInitData;
};

export const ModeratorInitMessage: IIncomingPacket<ModeratorInitMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModeratorInitMessageType = {
        data: ModeratorInitDataParser(wrapper)
    };

    return packet;
};

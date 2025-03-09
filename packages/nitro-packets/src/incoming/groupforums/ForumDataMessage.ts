import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumExtendedDataParser } from './ForumExtendedDataParser';
import { IForumData } from './IForumData';
import { IForumExtendedData } from './IForumExtendedData';

type ForumDataMessageType = {
    extendedForumData: IForumExtendedData & IForumData;
};

export const ForumDataMessage: IIncomingPacket<ForumDataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ForumDataMessageType = {
        extendedForumData: ForumExtendedDataParser(wrapper),
    };

    return packet;
};

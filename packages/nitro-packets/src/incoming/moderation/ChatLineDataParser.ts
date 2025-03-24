import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IChatLineData } from './IChatLineData';

export const ChatLineDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IChatLineData = {
        timestamp: wrapper.readString(),
        habboId: wrapper.readInt(),
        username: wrapper.readString(),
        message: wrapper.readString(),
        hasHighlighting: wrapper.readBoolean()
    };

    return packet;
}

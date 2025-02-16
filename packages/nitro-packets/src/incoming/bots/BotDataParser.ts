import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IBotData } from './IBotData';

export const BotDataParser = (wrapper: IMessageDataWrapper): IBotData =>
{
    return {
        id: wrapper.readInt(),
        name: wrapper.readString(),
        motto: wrapper.readString(),
        gender: wrapper.readString(),
        figure: wrapper.readString()
    };
}

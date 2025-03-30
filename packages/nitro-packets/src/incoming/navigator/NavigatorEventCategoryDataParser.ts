import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorEventCategoryData } from './INavigatorEventCategoryData';

export const NavigatorEventCategoryDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorEventCategoryData = {
        id: wrapper.readInt(),
        name: wrapper.readString(),
        visible: wrapper.readBoolean()
    };

    return packet;
}

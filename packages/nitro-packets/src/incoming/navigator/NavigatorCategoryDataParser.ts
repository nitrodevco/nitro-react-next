import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorCategoryData } from './INavigatorCategoryData';

export const NavigatorCategoryDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorCategoryData = {
        id: wrapper.readInt(),
        name: wrapper.readString(),
        visible: wrapper.readBoolean(),
        automatic: wrapper.readBoolean(),
        automaticCategoryKey: wrapper.readString(),
        globalCategoryKey: wrapper.readString(),
        staffOnly: wrapper.readBoolean()
    };

    return packet;
}

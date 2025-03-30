import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorLiftedData } from './INavigatorLiftedData';

export const NavigatorLiftedDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorLiftedData = {
        roomId: wrapper.readInt(),
        areaId: wrapper.readInt(),
        image: wrapper.readString(),
        caption: wrapper.readString()
    };

    return packet;
}

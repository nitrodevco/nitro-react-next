import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRarityCategoryData } from './IRarityCategoryData';

export const RarityCategoryDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRarityCategoryData = {
        chance: wrapper.readInt(),
        breeds: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.breeds.push(wrapper.readInt());

        count--;
    }

    return packet;
}

import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogLocalizationData } from './ICatalogLocalizationData';

export const CatalogLocalizationDataParser = (wrapper: IMessageDataWrapper): ICatalogLocalizationData =>
{
    const packet: ICatalogLocalizationData = {
        images: [],
        texts: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.images.push(wrapper.readString());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.texts.push(wrapper.readString());

        count--;
    }

    return packet;
}

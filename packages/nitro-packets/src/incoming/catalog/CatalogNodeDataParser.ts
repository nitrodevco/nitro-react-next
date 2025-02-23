import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogNodeData } from './ICatalogNodeData';

export const CatalogNodeDataParser = (wrapper: IMessageDataWrapper): ICatalogNodeData =>
{
    const packet: ICatalogNodeData = {
        visible: wrapper.readBoolean(),
        icon: wrapper.readInt(),
        pageId: wrapper.readInt(),
        pageName: wrapper.readString(),
        localization: wrapper.readString(),
        children: [],
        offerIds: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.offerIds.push(wrapper.readInt());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.children.push(CatalogNodeDataParser(wrapper));
        count--;
    }

    return packet;
}

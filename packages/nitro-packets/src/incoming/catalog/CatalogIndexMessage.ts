import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogNodeDataParser } from './CatalogNodeDataParser';
import { ICatalogNodeData } from './ICatalogNodeData';

type CatalogIndexMessageType = {
    root: ICatalogNodeData;
    newAdditionsAvailable: boolean;
    catalogType: string;
};

export const CatalogIndexMessage: IIncomingPacket<CatalogIndexMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CatalogIndexMessageType = {
        root: CatalogNodeDataParser(wrapper),
        newAdditionsAvailable: wrapper.readBoolean(),
        catalogType: wrapper.readString()
    };

    return packet;
};

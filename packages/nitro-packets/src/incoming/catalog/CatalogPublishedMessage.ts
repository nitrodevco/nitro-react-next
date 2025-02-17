import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CatalogPublishedMessageType = {
    instantlyRefreshCatalogue: boolean;
    newFurniDataHash: string;
};

export const CatalogPublishedMessage: IIncomingPacket<CatalogPublishedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CatalogPublishedMessageType = {
        instantlyRefreshCatalogue: wrapper.readBoolean(),
        newFurniDataHash: '',
    };

    if (wrapper.bytesAvailable) packet.newFurniDataHash = wrapper.readString();

    return packet;
};

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CatalogPageExpirationMessageType = {
    pageId: number;
    pageName: string;
    secondsToExpiry: number;
    image: string;
};

export const CatalogPageExpirationMessage: IIncomingPacket<CatalogPageExpirationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CatalogPageExpirationMessageType = {
        pageId: wrapper.readInt(),
        pageName: wrapper.readString(),
        secondsToExpiry: wrapper.readInt(),
        image: wrapper.readString(),
    };

    return packet;
};

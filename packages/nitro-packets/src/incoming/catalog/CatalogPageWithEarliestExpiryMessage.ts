import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CatalogPageWithEarliestExpiryMessageType = {
    pageName: string;
    secondsToExpiry: number;
    image: string;
};

export const CatalogPageWithEarliestExpiryMessage: IIncomingPacket<CatalogPageWithEarliestExpiryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CatalogPageWithEarliestExpiryMessageType = {
        pageName: wrapper.readString(),
        secondsToExpiry: wrapper.readInt(),
        image: wrapper.readString(),
    };

    return packet;
};

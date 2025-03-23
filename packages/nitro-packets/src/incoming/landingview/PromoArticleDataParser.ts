import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPromoArticleData } from './IPromoArticleData';
import { PromoLinkTypeEnum } from './PromoLinkTypeEnum';

export const PromoArticleDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPromoArticleData = {
        id: wrapper.readInt(),
        title: wrapper.readString(),
        bodyText: wrapper.readString(),
        buttonText: wrapper.readString(),
        linkType: wrapper.readInt() as PromoLinkTypeEnum,
        linkContent: wrapper.readString(),
        imageUrl: wrapper.readString()
    };

    return packet;
}

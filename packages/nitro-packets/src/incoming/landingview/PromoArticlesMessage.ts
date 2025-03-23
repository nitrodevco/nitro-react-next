import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPromoArticleData } from './IPromoArticleData';
import { PromoArticleDataParser } from './PromoArticleDataParser';

type PromoArticlesMessageType = {
    articles: IPromoArticleData[];
};

export const PromoArticlesMessage: IIncomingPacket<PromoArticlesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PromoArticlesMessageType = {
        articles: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.articles.push(PromoArticleDataParser(wrapper));

        count--;
    }

    return packet;
};

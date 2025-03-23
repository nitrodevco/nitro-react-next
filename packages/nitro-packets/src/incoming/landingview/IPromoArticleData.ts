import { PromoLinkTypeEnum } from './PromoLinkTypeEnum';

export interface IPromoArticleData
{
    id: number;
    title: string;
    bodyText: string;
    buttonText: string;
    linkType: PromoLinkTypeEnum;
    linkContent: string;
    imageUrl: string;
}

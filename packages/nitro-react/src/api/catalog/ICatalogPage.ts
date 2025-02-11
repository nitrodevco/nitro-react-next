import { ICatalogPageLocalization } from './ICatalogPageLocalization';
import { IPurchasableOffer } from './IPurchasableOffer';

export interface ICatalogPage
{
    pageId: number;
    layoutCode: string;
    localization: ICatalogPageLocalization;
    offers: IPurchasableOffer[];
    acceptSeasonCurrencyAsCredits: boolean;
    mode: number;
}

import { ICatalogPage, IPurchasableOffer } from '#base/api';
import { RoomPreviewer } from '@nitrodevco/nitro-renderer';

export interface CatalogLayoutProps
{
    page: ICatalogPage;
    roomPreviewer: RoomPreviewer;
    currentOffer: IPurchasableOffer;
}

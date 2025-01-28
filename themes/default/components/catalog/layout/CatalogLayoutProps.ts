import { ICatalogPage } from '#base/api';
import { RoomPreviewer } from '@nitrots/nitro-renderer';

export interface CatalogLayoutProps
{
    page: ICatalogPage;
    roomPreviewer: RoomPreviewer;
}

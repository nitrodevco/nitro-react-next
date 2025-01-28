import { ICatalogPage } from '#base/api';
import { RoomPreviewer } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { CatalogDefaultLayoutView, CatalogLayoutProps } from './layout';

export const CatalogPageView: FC<{
    page: ICatalogPage;
    roomPreviewer: RoomPreviewer;
}> = props =>
{
    const { page = null, roomPreviewer = null } = props;

    if(!page) return null;

    const layoutProps: CatalogLayoutProps = { page, roomPreviewer };

    switch(page.layoutCode)
    {
        case 'bots':
        case 'default_3x3':
        default:
            return <CatalogDefaultLayoutView { ...layoutProps } />;
    }
}

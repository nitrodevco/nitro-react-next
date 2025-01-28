import { FC } from 'react';
import { CatalogOfferGridWidgetView } from '../widgets/CatalogOfferGridWidgetView';
import { CatalogLayoutProps } from './CatalogLayoutProps';

export const CatalogDefaultLayoutView: FC<CatalogLayoutProps> = props =>
{
    const { page = null, roomPreviewer = null } = props;

    if(!page) return null;

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-2 overflow-hidden">
                <CatalogOfferGridWidgetView />
            </div>
            <div className="flex flex-col col-span-5 gap-2">
                right
            </div>
        </div>
    )
}

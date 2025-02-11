import { FC } from 'react';
import { CatalogDefaultLayoutView, CatalogLayoutProps } from './layout';

export const CatalogPageView: FC<CatalogLayoutProps> = props =>
{
    const { page = null } = props;

    if(!page) return null;

    switch(page.layoutCode)
    {
        case 'bots':
        case 'default_3x3':
        default:
            return <CatalogDefaultLayoutView key={ `catalog-page-${ page.pageId }` } { ...props } />;
    }
}

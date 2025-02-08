import { ICatalogPage } from '#base/api';
import { useConfigValue } from '#base/hooks';
import { NitroImage } from '#themes/default';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

export const CatalogPageImageView: FC<{
    page: ICatalogPage;
    imageIndex: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { page = null, imageIndex = 0, ...rest } = props;
    const baseUrl = useConfigValue<string>('asset.urls.catalog', '');

    if(!page) return null;

    let imageUrl = '';

    const pageLocalization = page.localization;

    if (pageLocalization)
    {
        const imageName = pageLocalization.images[imageIndex];

        if (imageName && imageName.length) imageUrl = `${ baseUrl }/${imageName}.gif`;
    }

    return <NitroImage url={ imageUrl } { ...rest } />;
}

import { ICatalogPage } from '#base/api';
import { NitroConfigContext } from '#base/context/NitroConfigContext.tsx';
import { NitroImage } from '#themes/default/layout/NitroImage.tsx';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';

export const CatalogPageImageView: FC<{
    page: ICatalogPage;
    imageIndex: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { page = null, imageIndex = 0, ...rest } = props;
    const { getConfigValue = null } = useContext(NitroConfigContext);

    if(!page) return null;

    let imageUrl = '';

    const pageLocalization = page.localization;

    if (pageLocalization)
    {
        const imageName = pageLocalization.images[imageIndex];

        if (imageName && imageName.length)
        {
            imageUrl = getConfigValue<string>('asset.urls.catalog');

            imageUrl = `${imageUrl}/${imageName}.gif`;
        }
    }

    return <NitroImage url={ imageUrl } { ...rest } />;
}

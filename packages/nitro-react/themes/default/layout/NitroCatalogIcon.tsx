import { useConfigValue } from '#base/hooks';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { NitroImage } from './NitroImage';

export const NitroCatalogIcon: FC<{
    icon: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { icon = 0, ...rest } = props;
    const baseUrl = useConfigValue<string>('asset.urls.icons.catalog', '');
    const imageUrl = `${ baseUrl }/icon_${ icon }.png`;

    return <NitroImage url={ imageUrl } { ...rest } />;
};

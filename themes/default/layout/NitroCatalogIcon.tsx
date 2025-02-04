import { NitroConfigContext } from '#base/context';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { NitroImage } from './NitroImage';

export const NitroCatalogIcon: FC<{
    icon: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { icon = 0, ...rest } = props;
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const imageUrl = getConfigValue<string>('asset.urls.icons.catalog')?.replace('%name%', icon.toString());

    return <NitroImage url={ imageUrl } { ...rest } />;
};

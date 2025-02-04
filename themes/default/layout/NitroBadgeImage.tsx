import { NitroConfigContext } from '#base/context';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { NitroImage } from './NitroImage';

export const NitroBadgeImage: FC<{
    badgeCode: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { badgeCode = null, ...rest } = props;
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const imageUrl = `${ getConfigValue<string>('asset.urls.badges') }/${ badgeCode }.gif`;

    return <NitroImage url={ imageUrl } { ...rest } />;
};

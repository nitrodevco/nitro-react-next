import { useConfigValue } from '#base/hooks';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { NitroImage } from './NitroImage';

export const NitroBadgeImage: FC<{
    badgeCode: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { badgeCode = null, ...rest } = props;
    const baseUrl = useConfigValue<string>('asset.urls.badges', '');
    const imageUrl = `${ baseUrl }/${ badgeCode }.gif`;

    return <NitroImage url={ imageUrl } { ...rest } />;
};

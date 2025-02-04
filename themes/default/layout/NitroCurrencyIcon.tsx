import { NitroConfigContext } from '#base/context';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react';
import { NitroImage } from './NitroImage';

export const NitroCurrencyIcon: FC<{
    type: string | number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { type = '', ...rest } = props;
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const imageUrl = getConfigValue<string>('asset.urls.icons.currency')?.replace('%type%', type.toString());

    return <NitroImage url={ imageUrl } { ...rest } />;
};

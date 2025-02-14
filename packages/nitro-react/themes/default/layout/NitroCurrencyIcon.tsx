import { useConfigValue } from '#base/hooks';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { NitroImage } from './NitroImage';

export const NitroCurrencyIcon: FC<{
    type: string | number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
    {
        const { type = '', ...rest } = props;
        const currencyConfig = useConfigValue<{
            type: number;
            name: string;
            iconUrl: string;
            borderColor: string;
            textColor: string;
            backgroundColor: string;
        }[]>('settings.currencies', [])?.find(x => x.type == type) || null;

        if (!currencyConfig)
        {
            NitroLogger.warn(`Currency type ${type} not found in config.`);

            return null;
        }

        return <NitroImage url={currencyConfig.iconUrl} {...rest} />;
    };

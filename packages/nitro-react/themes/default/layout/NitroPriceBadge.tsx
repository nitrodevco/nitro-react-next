import { useConfigValue } from '#base/hooks';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { NitroImage } from './NitroImage';

export const NitroPriceBadge: FC<{
    type: number;
    amount: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { type = -1, amount = 0, ...rest } = props;
    const currencyConfig = useConfigValue<{
        type: number;
        name: string;
        iconUrl: string;
        borderColor: string;
        textColor: string;
        backgroundColor: string;
    }[]>('settings.currencies', [])?.find(x => x.type == type) || null;

    const textColor = currencyConfig?.textColor || '#000000';
    const backgroundColor = currencyConfig?.backgroundColor || 'transparent';
    const borderColor = currencyConfig?.borderColor || 'transparent';

    return (
        <div
            className="flex gap-1 items-center justify-center rounded-md p-1"
            style={ {
                color: textColor,
                backgroundColor: backgroundColor,
                borderColor: borderColor
            }}>
            <span
                className="font-bold">{ amount }</span>
            <NitroImage url={ currencyConfig.iconUrl } />
        </div>
    );
}

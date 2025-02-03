import { NitroConfigContext } from '#base/context';
import { classNames, styleNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext, useEffect, useRef, useState } from 'react';

export const NitroCurrencyIcon: FC<{
    type: string | number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { type = '', className = null, style = null, ref = null, ...rest } = props;
    const [ imageUrl, setImageUrl ] = useState('');
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        const image = new Image();

        image.src = getConfigValue<string>('asset.urls.icons.currency')?.replace('%type%', type.toString());
        image.onload = () =>
        {
            if(isDisposed.current) return;

            setImageUrl(image.src);
        }
    }, [ type ]);

    useEffect(() =>
    {
        isDisposed.current = false;

        return () =>
        {
            isDisposed.current = true;
        };
    }, []);

    return (
        <div
            ref={ ref }
            className={ classNames(
                'overflow-hidden relative bg-center bg-no-repeat min-w-[15px] min-h-[15px]',
                className
            ) }
            style={ styleNames(
                {
                    backgroundImage: (imageUrl?.length > 0) ? `url(${ imageUrl })` : `url(${ getConfigValue<string>('asset.urls.icons.loading') })`,
                    ...style
                }
            ) }
            { ...rest } />
    );
};

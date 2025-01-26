import { GetConfigurationValue } from '#base/api';
import { classNames, styleNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroCatalogIcon: FC<{
    icon: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { icon = 0, className = null, style = null, ref = null, ...rest } = props;
    const [ imageUrl, setImageUrl ] = useState('');
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        const image = new Image();

        image.src = GetConfigurationValue<string>('catalog.asset.icon.url').replace('%name%', icon.toString());
        image.onload = () =>
        {
            if(isDisposed.current) return;

            setImageUrl(image.src);
        }
    }, [ icon ]);

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
                'overflow-hidden relative bg-center bg-no-repeat min-w-[20px] min-h-[20px]',
                className
            ) }
            style={ styleNames(
                {
                    backgroundImage: (imageUrl?.length > 0) ? `url(${ imageUrl })` : `url("/assets/images/ui/loading_icon.png")`,
                    ...style
                }
            ) }
            { ...rest } />
    );
};

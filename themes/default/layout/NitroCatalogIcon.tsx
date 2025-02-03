import { NitroConfigContext } from '#base/context/NitroConfigContext.tsx';
import { classNames, styleNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext, useEffect, useRef, useState } from 'react';

export const NitroCatalogIcon: FC<{
    icon: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { icon = 0, className = null, style = null, ref = null, ...rest } = props;
    const [ imageUrl, setImageUrl ] = useState('');
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        const image = new Image();

        image.src = getConfigValue<string>('asset.urls.icons.catalog')?.replace('%name%', icon.toString());
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
                    backgroundImage: (imageUrl?.length > 0) ? `url(${ imageUrl })` : `url(${ getConfigValue<string>('asset.urls.icons.loading') })`,
                    ...style
                }
            ) }
            { ...rest } />
    );
};

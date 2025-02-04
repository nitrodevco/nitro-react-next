import { NitroConfigContext } from '#base/context';
import { classNames, styleNames } from '#base/utils';
import { GetSessionDataManager } from '@nitrots/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useContext, useEffect, useRef, useState } from 'react';

export const NitroBadgeImage: FC<{
    badgeCode: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { badgeCode = null, className = null, style = null, ref = null, ...rest } = props;
    const [ imageUrl, setImageUrl ] = useState('');
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        if(!badgeCode || !badgeCode.length) return;

        const image = new Image();

        image.src = GetSessionDataManager().getBadgeUrl(badgeCode);
        image.onload = () =>
        {
            if(isDisposed.current) return;

            setImageUrl(image.src);
        }

        return () =>
        {
            setImageUrl('');
        }
    }, [ badgeCode ]);

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
                'overflow-hidden relative bg-center bg-no-repeat bg-auto w-[50px] h-[50px]',
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

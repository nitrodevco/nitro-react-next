import { useConfigValue } from '#base/hooks';
import { classNames, styleNames } from '#base/utils';
import { BadgeImageReadyEvent, GetEventDispatcher, GetSessionDataManager, TextureUtils } from '@nitrots/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroGroupBadgeImage: FC<{
    badgeCode: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { badgeCode = null, className = null, style = null, ref = null, ...rest } = props;
    const [ imageUrl, setImageUrl ] = useState('');
    const loadingUrl = useConfigValue<string>('asset.urls.icons.loading', '');
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        if(!badgeCode || !badgeCode.length) return;

        let didSetBadge = false;

        const onBadgeImageReadyEvent = async (event: BadgeImageReadyEvent) =>
        {
            if(isDisposed.current || !event || (event.badgeId !== badgeCode)) return;

            didSetBadge = true;

            const imageUrl = await TextureUtils.generateImageUrl(event.image);

            setImageUrl(imageUrl);

            GetEventDispatcher().removeEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);
        };
            
        GetEventDispatcher().addEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);

        const texture = GetSessionDataManager().getGroupBadgeImage(badgeCode);

        if(texture && !didSetBadge)
        {
            const generateImage = async () =>
            {
                const imageUrl = await TextureUtils.generateImageUrl(texture);

                setImageUrl(imageUrl);
            }

            generateImage();
        }

        return () =>
        {
            GetEventDispatcher().removeEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);
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
                    backgroundImage: (imageUrl?.length > 0) ? `url(${ imageUrl })` : `url(${ loadingUrl })`,
                    ...style
                }
            ) }
            { ...rest } />
    );
};

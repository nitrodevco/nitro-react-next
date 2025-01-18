import { classNames, styleNames } from '#base/utils';
import { BadgeImageReadyEvent, GetEventDispatcher, GetSessionDataManager, TextureUtils } from '@nitrots/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroBadgeImage: FC<{
    badgeCode: string;
    isGroupBadge?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { badgeCode = null, isGroupBadge = false, className = null, style = null, ref = null, ...rest } = props;
    const [ imageData, setImageData ] = useState({ url: '', width: 45, height: 45 });
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        if(!badgeCode || !badgeCode.length) return;

        if(!isGroupBadge)
        {
            const image = new Image();

            image.src = GetSessionDataManager().getBadgeUrl(badgeCode);
            image.onload = () =>
            {
                if(isDisposed.current) return;

                setImageData({
                    url: image.src,
                    width: image.width,
                    height: image.height
                });
            }

            return;
        }
        
        let didSetBadge = false;

        const onBadgeImageReadyEvent = async (event: BadgeImageReadyEvent) =>
        {
            if(isDisposed.current || !event || event.badgeId !== badgeCode) return;

            didSetBadge = true;

            const imageUrl = await TextureUtils.generateImageUrl(event.image);

            setImageData({
                url: imageUrl,
                width: event.image.width,
                height: event.image.height
            });

            GetEventDispatcher().removeEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);
        };
            
        GetEventDispatcher().addEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);

        const texture = GetSessionDataManager().getGroupBadgeImage(badgeCode);

        if(texture && !didSetBadge)
        {
            const generateImage = async () =>
            {
                const imageUrl = await TextureUtils.generateImageUrl(texture);

                setImageData({
                    url: imageUrl,
                    width: texture.width,
                    height: texture.height
                });
            }

            generateImage();
        }

        return () =>
        {
            GetEventDispatcher().removeEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);
        }
    }, [ badgeCode, isGroupBadge ]);

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
                'flex flex-col items-center justify-center overflow-hidden relative bg-center bg-no-repeat',
                className
            ) }
            style={ styleNames(
                {
                    backgroundImage: (imageData?.url?.length > 0) ? `url(${ imageData.url })` : `url("/assets/images/ui/loading_icon.png")`,
                    width: `${ imageData.width }px`,
                    height: `${ imageData.height }px`,
                    ...style
                }
            ) }
            { ...rest } />
    );
};

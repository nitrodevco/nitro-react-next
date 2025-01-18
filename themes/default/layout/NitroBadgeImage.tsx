import { classNames, styleNames } from '#base/utils';
import { BadgeImageReadyEvent, GetEventDispatcher, GetSessionDataManager, TextureUtils } from '@nitrots/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroBadgeImage: FC<{
    badgeCode: string;
    isGroupBadge?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { badgeCode = null, isGroupBadge = false, className = null, style = null, ref = null, ...rest } = props;
    const [ imageData, setImageData ] = useState({ url: '', width: 0, height: 0 });
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        if(!badgeCode || !badgeCode.length) return;

        let didSetBadge = false;

        const onBadgeImageReadyEvent = async (event: BadgeImageReadyEvent) =>
        {
            if(isDisposed.current || !event || event.badgeId !== badgeCode) return;

            const imageUrl = await TextureUtils.generateImageUrl(event.image);

            setImageData({
                url: imageUrl,
                width: event.image.width,
                height: event.image.height
            });

            removeEvent();
        };

        const removeEvent = () => GetEventDispatcher().removeEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);

        GetEventDispatcher().addEventListener(BadgeImageReadyEvent.IMAGE_READY, onBadgeImageReadyEvent);

        const texture = isGroupBadge ? GetSessionDataManager().getGroupBadgeImage(badgeCode) : GetSessionDataManager().getBadgeImage(badgeCode);

        if(texture && !didSetBadge)
        {
            (async () =>
            {
                const imageUrl = await TextureUtils.generateImageUrl(texture);

                setImageData({
                    url: imageUrl,
                    width: texture.width,
                    height: texture.height
                });

                removeEvent();
            })();
        }

        return () => removeEvent();
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
                imageData?.url?.length && {
                    backgroundImage: `url(${ imageData.url })`,
                }, {
                    width: `${ imageData.width }px`,
                    height: `${ imageData.height }px`
                },
                { ...style }
            ) }
            { ...rest } />
    );
};

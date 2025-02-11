import { useConfigValue, useEventListener } from '#base/hooks';
import { classNames, styleNames } from '#base/utils';
import { BadgeImageReadyEvent, GetSessionDataManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroGroupBadgeImage: FC<{
    badgeCode: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
    {
        const { badgeCode = null, className = null, style = null, ref = null, ...rest } = props;
        const [imageUrl, setImageUrl] = useState('');
        const loadingUrl = useConfigValue<string>('asset.urls.icons.loading', '');
        const isDisposed = useRef(false);

        useEventListener(BadgeImageReadyEvent.IMAGE_READY, async (event: BadgeImageReadyEvent) =>
        {
            if (isDisposed.current || !event || (event.badgeId !== badgeCode)) return;

            const imageUrl = await TextureUtils.generateImageUrl(event.image);

            setImageUrl(imageUrl);
        }, (!imageUrl || !imageUrl.length));

        useEffect(() =>
        {
            if (!badgeCode || !badgeCode.length) return;

            const texture = GetSessionDataManager().getGroupBadgeImage(badgeCode);

            if (texture && !imageUrl || !imageUrl.length)
            {
                const generateImage = async () =>
                {
                    const imageUrl = await TextureUtils.generateImageUrl(texture);

                    if (imageUrl && imageUrl.length) return;

                    setImageUrl(imageUrl);
                }

                generateImage();
            }
        }, [badgeCode, imageUrl]);

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
                ref={ref}
                className={classNames(
                    'overflow-hidden relative bg-center bg-no-repeat bg-auto w-[50px] h-[50px]',
                    className
                )}
                style={styleNames(
                    {
                        backgroundImage: (imageUrl?.length > 0) ? `url(${imageUrl})` : `url(${loadingUrl})`,
                        ...style
                    }
                )}
                {...rest} />
        );
    };

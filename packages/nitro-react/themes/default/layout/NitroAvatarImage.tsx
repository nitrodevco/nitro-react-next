import { classNames, styleNames } from '#base/utils';
import { AvatarScaleType, AvatarSetType, GetAvatarRenderManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

const AVATAR_IMAGE_CACHE: Map<string, string> = new Map();

export const NitroAvatarImage: FC<{
    avatarFigure: string;
    avatarGender?: string;
    avatarHeadOnly?: boolean;
    avatarDirection?: number;
    avatarScale?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
    {
        const { avatarFigure = '', avatarGender = 'M', avatarHeadOnly = false, avatarDirection = 0, avatarScale = 1, className = null, style = null, ref = null, ...rest } = props;
        const [imageData, setImageData] = useState({ url: '', width: 0, height: 0 });
        const isDisposed = useRef(false);

        useEffect(() =>
        {
            const resetFigure = async (figure: string) =>
            {
                if (isDisposed.current) return;

                const avatarImage = GetAvatarRenderManager().createAvatarImage(figure, AvatarScaleType.LARGE, avatarGender, { resetFigure: (figure: string) => resetFigure(figure), dispose: null, disposed: false });

                let setType = AvatarSetType.FULL;

                if (avatarHeadOnly) setType = AvatarSetType.HEAD;

                avatarImage.setDirection(setType, avatarDirection);

                const texture = avatarImage.processAsTexture(setType);
                const imageUrl = await TextureUtils.generateImageUrl(texture);

                setImageData({
                    url: imageUrl,
                    width: texture.width,
                    height: texture.height
                });
            }

            resetFigure(avatarFigure);
        }, [avatarFigure, avatarGender, avatarHeadOnly, avatarDirection]);

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
                    'avatar-image relative bg-no-repeat bg-[center_-8px] pointer-events-none',
                    className
                )}
                style={styleNames(
                    imageData?.url?.length && {
                        backgroundImage: `url(${imageData.url})`,
                    }, {
                    width: `${imageData.width}px`,
                    height: `${imageData.height}px`
                },
                    { ...style }
                )}
                {...rest} />
        );
    };

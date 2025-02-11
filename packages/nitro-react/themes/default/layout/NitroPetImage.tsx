import { classNames, styleNames } from '#base/utils';
import { GetRoomEngine, IImageResult, IPetCustomPart, PetFigureData, TextureUtils, Vector3d } from '@nitrodevco/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroPetImage: FC<{
    petFigure?: string;
    petTypeId?: number;
    petPaletteId?: number;
    petColor?: number;
    customParts?: IPetCustomPart[];
    posture?: string;
    headOnly?: boolean;
    direction?: number;
    scale?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
    {
        const { petFigure = '', petTypeId = -1, petPaletteId = -1, petColor = 0xFFFFFF, customParts = [], posture = 'std', headOnly = false, direction = 0, scale = 1, className = null, style = null, ref = null, ...rest } = props;
        const [imageData, setImageData] = useState({ url: '', width: 0, height: 0 });
        const isDisposed = useRef(false);

        useEffect(() =>
        {
            const petImageData = {
                petTypeId: petTypeId,
                petPaletteId: petPaletteId,
                petColor: petColor,
                customParts: customParts,
                posture: posture,
                headOnly: headOnly
            };

            if (petFigure && petFigure.length)
            {
                const petFigureData = new PetFigureData(petFigure);

                petImageData.petTypeId = petFigureData.typeId;
                petImageData.petPaletteId = petFigureData.paletteId;
                petImageData.petColor = petFigureData.color;
                petImageData.customParts = petFigureData.customParts;
            }

            if (petImageData.petTypeId === 16) petImageData.headOnly = false;

            const processImageResult = async (imageResult: IImageResult) =>
            {
                if (isDisposed.current || !imageResult || !imageResult.data) return;

                const imageUrl = await TextureUtils.generateImageUrl(imageResult.data);

                setImageData({
                    url: imageUrl,
                    width: imageResult.data.width,
                    height: imageResult.data.height
                });
            }

            processImageResult(GetRoomEngine().getRoomObjectPetImage(petImageData.petTypeId, petImageData.petPaletteId, petImageData.petColor, new Vector3d((direction * 45)), 64, {
                imageReady: processImageResult,
                imageFailed: (id) => { }
            }, petImageData.headOnly, 0, petImageData.customParts, petImageData.posture));
        }, [petFigure, petTypeId, petPaletteId, petColor, customParts, posture, headOnly, direction]);

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
                    'flex flex-col items-center justify-center overflow-hidden relative bg-center bg-no-repeat',
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

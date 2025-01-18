import { classNames, styleNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

export const NitroFurniIconImage: FC<{
    url?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { url = null, className = null, style = null, ref = null, ...rest } = props;
    const [ imageData, setImageData ] = useState({ url: '', width: 45, height: 45 });
    const isDisposed = useRef(false);

    useEffect(() =>
    {
        if(!url || !url.length) return;

        const image = new Image();

        image.src = url;
        image.onload = () =>
        {
            if(isDisposed.current) return;

            setImageData({
                url: image.src,
                width: image.width,
                height: image.height
            });
        }
    }, [ url ]);

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

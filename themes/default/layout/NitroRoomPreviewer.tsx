import { useResizeObserver } from '#base/hooks';
import { GetRenderer, GetTexturePool, GetTicker, NitroContainer, NitroTexture, NitroTicker, RoomPreviewer, TextureUtils } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

export const NitroRoomPreviewer: FC<{
    roomPreviewer: RoomPreviewer;
}> = props =>
{
    const { roomPreviewer = null } = props;
    const [ previewSize, setPreviewSize ] = useState<{ width: number, height: number }>(null);
    const [ didRender, setDidRender ] = useState(false);
    const roomCanvas = useRef<NitroContainer>(null);
    const roomTexture = useRef<NitroTexture>(null);
    const elementRef = useRef<HTMLDivElement>(null);

    const onClick = (event: MouseEvent<HTMLDivElement>) =>
    {
        if(!roomPreviewer) return;

        if(event.shiftKey) roomPreviewer.changeRoomObjectDirection();
        else roomPreviewer.changeRoomObjectState();
    };

    const updateCanvas = async (ticker: NitroTicker) =>
    {
        if(!roomPreviewer || !roomCanvas || !roomCanvas.current || !roomTexture || !roomTexture.current) return;

        roomPreviewer.updatePreviewRoomView();

        GetRenderer().render({
            target: roomTexture.current,
            container: roomCanvas.current,
            clear: true
        });

        const url = await TextureUtils.generateImageUrl(roomTexture.current);

        if(!elementRef || !elementRef.current) return;

        elementRef.current.style.backgroundImage = `url(${ url })`;
    };

    useResizeObserver({
        ref: elementRef,
        onResize: (width, height) => setPreviewSize({ width, height })
    });

    useEffect(() =>
    {
        if (!didRender || !previewSize || !roomPreviewer) return;
        
        if (roomTexture?.current)
        {
            const previousWidth = roomTexture.current.width;
            const previousHeight = roomTexture.current.height;

            if ((previousWidth === previewSize.width && previousHeight === previewSize.height)) return;

            GetTexturePool().putTexture(roomTexture.current);

            roomTexture.current = null;
        }

        if (!roomTexture.current) roomTexture.current = TextureUtils.createRenderTexture(previewSize.width, previewSize.height);

        roomPreviewer.modifyRoomCanvas(previewSize.width, previewSize.height);
    }, [ didRender, previewSize])

    useEffect(() =>
    {
        if(didRender || !previewSize || !roomPreviewer) return;

        roomCanvas.current = roomPreviewer.getRoomCanvas(previewSize.width, previewSize.height);

        setDidRender(true);
    }, [ didRender, previewSize ]);

    useEffect(() =>
    {
        GetTicker().add(updateCanvas);

        return () =>
        {
            GetTicker().remove(updateCanvas);
        }
    }, []);

    return (
        <div
            ref={ elementRef }
            className="relative size-full rounded-md shadow-room-previewer bg-no-repeat bg-center bg-black"
            onClick={ onClick } />
    );
};

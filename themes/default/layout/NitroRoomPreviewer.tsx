import { GetRenderer, GetTicker, NitroTicker, RoomPreviewer, TextureUtils } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useEffect, useRef } from 'react';

export const NitroRoomPreviewer: FC<{
    roomPreviewer: RoomPreviewer;
    height?: number;
}> = props =>
{
    const { roomPreviewer = null, height = 0 } = props;
    const elementRef = useRef<HTMLDivElement>(null);

    const onClick = (event: MouseEvent<HTMLDivElement>) =>
    {
        if(!roomPreviewer) return;

        if(event.shiftKey) roomPreviewer.changeRoomObjectDirection();
        else roomPreviewer.changeRoomObjectState();
    };

    useEffect(() =>
    {
        if(!elementRef) return;

        const width = elementRef.current.parentElement.clientWidth;
        const texture = TextureUtils.createRenderTexture(width, height);

        const update = async (ticker: NitroTicker) =>
        {
            if(!roomPreviewer || !elementRef.current) return;

            const canvas = roomPreviewer.getRoomCanvas(width, height);
            const renderingCanvas = roomPreviewer.getRenderingCanvas();

            if(!renderingCanvas.canvasUpdated) return;

            roomPreviewer.updatePreviewRoomView();

            GetRenderer().render({
                target: texture,
                container: canvas,
                clear: true
            });

            const url = await TextureUtils.generateImageUrl(texture);

            if(!elementRef || !elementRef.current) return;

            elementRef.current.style.backgroundImage = `url(${ url })`;
        };

        GetTicker().add(update);

        const resizeObserver = new ResizeObserver(() =>
        {
            if(!roomPreviewer || !elementRef.current) return;

            const width = elementRef.current.parentElement.offsetWidth;

            roomPreviewer.modifyRoomCanvas(width, height);

            update(GetTicker());
        });

        resizeObserver.observe(elementRef.current);

        return () =>
        {
            GetTicker().remove(update);

            resizeObserver.disconnect();

            texture.destroy(true);
        };
    }, [ roomPreviewer, elementRef, height ]);

    return (
        <div
            ref={ elementRef }
            className="relative w-full rounded-md shadow-room-previewer"
            style={ {
                height,
                minHeight: height,
                maxHeight: height
            } }
            onClick={ onClick } />
    );
};

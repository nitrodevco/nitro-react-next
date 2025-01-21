import { GetRenderer, GetTexturePool, GetTicker, NitroContainer, NitroTexture, NitroTicker, RoomPreviewer, TextureUtils } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useEffect, useRef } from 'react';

export const NitroRoomPreviewer: FC<{
    roomPreviewer: RoomPreviewer;
}> = props =>
{
    const { roomPreviewer = null } = props;
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
        if(!roomPreviewer || !roomCanvas?.current || !roomTexture?.current) return;

        if(roomPreviewer) roomPreviewer.updatePreviewRoomView();

        GetRenderer().render({
            target: roomTexture.current,
            container: roomCanvas.current,
            clear: true
        });

        const url = await TextureUtils.generateImageUrl(roomTexture.current);

        if(elementRef?.current) elementRef.current.style.backgroundImage = `url(${ url })`;
    }

    useEffect(() =>
    {
        if (!elementRef?.current || !roomPreviewer) return;

        const previousSize = {
            width: -1,
            height: -1
        };

        let debounceTimeout: ReturnType<typeof setTimeout> = null;

        const setup = () =>
        {
            if(roomTexture?.current) GetTexturePool().putTexture(roomTexture.current);

            roomTexture.current = GetTexturePool().getTexture(previousSize.width, previousSize.height);

            if(!roomCanvas?.current)
            {
                roomCanvas.current = roomPreviewer.getRoomCanvas(previousSize.width, previousSize.height);
            }
            else
            {
                roomPreviewer.modifyRoomCanvas(previousSize.width, previousSize.height);
            }
        }

        const resize = (width: number, height: number) =>
        {
            if ((width === previousSize.width) && (height === previousSize.height)) return;

            previousSize.width = width;
            previousSize.height = height;

            if (debounceTimeout) clearTimeout(debounceTimeout);

            if((previousSize.width === -1) && (previousSize.height === -1))
            {
                setup();
            }
            else
            {
                debounceTimeout = setTimeout(() => setup(), 1);
            }
        };

        const resizeObserver = new ResizeObserver(entries =>
        {
            const entry = entries?.[0];

            if (entry) resize(Math.floor(entry.contentRect.width), Math.floor(entry.contentRect.height));
        });

        resizeObserver.observe(elementRef.current);

        const initialSize = elementRef.current.getBoundingClientRect();

        if (initialSize) resize(initialSize.width, initialSize.height);

        GetTicker().add(updateCanvas);

        return () =>
        {
            if (debounceTimeout) clearTimeout(debounceTimeout);

            resizeObserver.disconnect();

            GetTicker().remove(updateCanvas);
        };
    }, []);

    return (
        <div
            ref={ elementRef }
            className="relative size-full rounded-md shadow-room-previewer bg-no-repeat bg-center bg-black"
            onClick={ onClick } />
    );
};

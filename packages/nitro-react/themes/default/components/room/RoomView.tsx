import { DispatchMouseEvent, DispatchTouchEvent, InitializeRoomInstanceRenderingCanvas, SetActiveRoomId } from '#base/api';
import { useRoomStore } from '#base/stores';
import { classNames } from '#base/utils';
import { GetRenderer, GetRoomEngine, GetStage, NitroAdjustmentFilter, NitroSprite, NitroTexture, RoomGeometry, RoomVariableEnum, Vector3d } from '@nitrodevco/nitro-renderer';
import { FC, useEffect, useRef } from 'react';

export const RoomView: FC = () =>
{
    const roomSession = useRoomStore(state => state.roomSession);
    const roomBackground = useRef<NitroSprite>(null);
    const roomFilter = useRef<NitroAdjustmentFilter>(null);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        if (!roomSession) return;

        const roomEngine = GetRoomEngine();
        const roomId = roomSession.roomId;
        const canvasId = 1;
        const width = Math.floor(window.innerWidth);
        const height = Math.floor(window.innerHeight);
        const renderer = GetRenderer();

        if (renderer) renderer.resize(width, height);

        const displayObject = roomEngine.getRoomInstanceDisplay(roomId, canvasId, width, height, RoomGeometry.SCALE_ZOOMED_IN);
        const canvas = GetRoomEngine().getRoomInstanceRenderingCanvas(roomId, canvasId);

        if (!displayObject || !canvas) return;

        const background = new NitroSprite(NitroTexture.WHITE);
        const filter = new NitroAdjustmentFilter();
        const master = canvas.master;

        background.tint = 0;
        background.width = width;
        background.height = height;

        master.addChildAt(background, 0);
        master.filters = [filter];

        roomBackground.current = background;
        roomFilter.current = filter;

        const geometry = (roomEngine.getRoomInstanceGeometry(roomId, canvasId) as RoomGeometry);

        if (geometry)
        {
            const minX = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MIN_X) || 0);
            const maxX = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MAX_X) || 0);
            const minY = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MIN_Y) || 0);
            const maxY = (roomEngine.getRoomInstanceVariable<number>(roomId, RoomVariableEnum.ROOM_MAX_Y) || 0);

            let x = ((minX + maxX) / 2);
            let y = ((minY + maxY) / 2);

            const offset = 20;

            x = (x + (offset - 1));
            y = (y + (offset - 1));

            const z = (Math.sqrt(((offset * offset) + (offset * offset))) * Math.tan(((30 / 180) * Math.PI)));

            geometry.location = new Vector3d(x, y, z);
        }

        GetStage().addChild(displayObject);

        SetActiveRoomId(roomSession.roomId);

        const resize = (event: UIEvent) =>
        {
            const width = Math.floor(window.innerWidth);
            const height = Math.floor(window.innerHeight);

            background.width = width;
            background.height = height;

            InitializeRoomInstanceRenderingCanvas(width, height, 1);

            renderer.resize(width, height, window.devicePixelRatio);
            renderer.render(GetStage());
        };

        window.addEventListener('resize', resize);

        return () =>
        {
            roomBackground.current = null;
            roomFilter.current = null;
            //setOriginalRoomBackgroundColor(0);

            window.removeEventListener('resize', resize);
        };
    }, [roomSession]);

    useEffect(() =>
    {
        const canvas = GetRenderer().canvas;

        if (!canvas) return;

        canvas.onclick = (event) => DispatchMouseEvent(event);
        canvas.onmousemove = (event) => DispatchMouseEvent(event);
        canvas.onmousedown = (event) => DispatchMouseEvent(event);
        canvas.onmouseup = (event) => DispatchMouseEvent(event);

        canvas.ontouchstart = (event) => DispatchTouchEvent(event);
        canvas.ontouchmove = (event) => DispatchTouchEvent(event);
        canvas.ontouchend = (event) => DispatchTouchEvent(event);
        canvas.ontouchcancel = (event) => DispatchTouchEvent(event);

        const element = elementRef.current;

        if (!element) return;

        canvas.classList.add('bg-black');

        element.appendChild(canvas);
    }, []);

    return (
        <div
            ref={elementRef}
            className={classNames('size-full', !roomSession && 'hidden')}
        >
            {roomSession && (
                <>
                </>
            )}
        </div>
    );
};

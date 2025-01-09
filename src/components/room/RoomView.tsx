import { DispatchMouseEvent, DispatchTouchEvent } from '#base/api';
import { useRoom } from '#base/hooks';
import { classNames } from '#base/layout';
import { useRoomStore } from '#base/stores';
import { GetRenderer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useRef } from 'react';

export const RoomView: FC = () =>
{
    const roomSession = useRoomStore(state => state.roomSession);
    const elementRef = useRef<HTMLDivElement>(null);

    useRoom();

    useEffect(() =>
    {
        const canvas = GetRenderer().canvas;

        if(!canvas) return;

        canvas.onclick = (event) => DispatchMouseEvent(event);
        canvas.onmousemove = (event) => DispatchMouseEvent(event);
        canvas.onmousedown = (event) => DispatchMouseEvent(event);
        canvas.onmouseup = (event) => DispatchMouseEvent(event);

        canvas.ontouchstart = (event) => DispatchTouchEvent(event);
        canvas.ontouchmove = (event) => DispatchTouchEvent(event);
        canvas.ontouchend = (event) => DispatchTouchEvent(event);
        canvas.ontouchcancel = (event) => DispatchTouchEvent(event);

        const element = elementRef.current;

        if(!element) return;

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

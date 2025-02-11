import { FC, PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

let WINDOW_Z_INDEX: number = 1000;
const CACHED_Z_INDEX: Map<string, number> = new Map();
const CACHED_POSITIONS: Map<string, { x: number, y: number}> = new Map();
const BOUNDS_VALUE = 10;

export interface DraggableWindowProps
{
    uniqueKey?: string;
    handleSelector?: string;
    disableDrag?: boolean;
    defaultPosition?: 'top-left' | 'center' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export const DraggableWindow: FC<PropsWithChildren<DraggableWindowProps>> = props =>
{
    const { uniqueKey = null, handleSelector = '.drag-handler', disableDrag = true, defaultPosition = 'center', children = null } = props;
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        const element = windowRef.current;

        if (!element) return;

        let startX = 0;
        let startY = 0;
        let initialX = 0;
        let initialY = 0;

        const bringToFront = () =>
        {
            let zIndex = CACHED_Z_INDEX.get(uniqueKey);

            if(zIndex !== WINDOW_Z_INDEX)
            {
                zIndex = (WINDOW_Z_INDEX + 1);

                CACHED_Z_INDEX.set(uniqueKey, zIndex);

                WINDOW_Z_INDEX = zIndex;
            }

            element.style.zIndex = String(zIndex);
        };

        const getDefaultPosition = () =>
        {
            const rect = element.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            switch (defaultPosition)
            {
                case 'center':
                    return { x: Math.trunc((viewportWidth - rect.width) / 2), y: Math.trunc((viewportHeight - rect.height) / 2) };
                case 'top-right':
                    return { x: Math.trunc(viewportWidth - rect.width - BOUNDS_VALUE), y: BOUNDS_VALUE };
                case 'bottom-left':
                    return { x: 10, y: Math.trunc(viewportHeight - rect.height - BOUNDS_VALUE) };
                case 'bottom-right':
                    return { x: Math.trunc(viewportWidth - rect.width - BOUNDS_VALUE), y: Math.trunc(viewportHeight - rect.height - BOUNDS_VALUE) };
                case 'top-left':
                default:
                    return { x: BOUNDS_VALUE, y: BOUNDS_VALUE };
            }
        };

        const adjustPositionWithinViewport = () =>
        {
            const rect = element.getBoundingClientRect();
            const position = CACHED_POSITIONS.get(uniqueKey) ?? getDefaultPosition();

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let newX = position.x;
            let newY = position.y;

            // Adjust if off-screen
            if (rect.right > viewportWidth) newX = Math.max(0, viewportWidth - rect.width);
            if (rect.bottom > viewportHeight) newY = Math.max(0, viewportHeight - rect.height);
            if (rect.left < 0) newX = 0;
            if (rect.top < 0) newY = 0;

            element.style.transform = `translate(${ newX }px, ${ newY }px)`;

            CACHED_POSITIONS.set(uniqueKey, { x: newX, y: newY });
        };

        const startDrag = (clientX: number, clientY: number) =>
        {
            startX = clientX;
            startY = clientY;

            const rect = element.getBoundingClientRect();

            initialX = rect.left;
            initialY = rect.top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchend', onMouseUp);
        };

        const drag = (clientX: number, clientY: number) =>
        {
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            const newX = initialX + deltaX;
            const newY = initialY + deltaY;

            element.style.transform = `translate(${newX}px, ${newY}px)`;

            CACHED_POSITIONS.set(uniqueKey, { x: newX, y: newY });
        };

        const onMouseDown = (event: MouseEvent) =>
        {
            startDrag(event.clientX, event.clientY);
        };

        const onTouchStart = (event: TouchEvent) =>
        {
            const target = event.touches[0]?.target as HTMLElement;

            if (handleSelector && !target?.classList.contains(handleSelector)) return;

            const touch = event.touches[0];

            startDrag(touch.clientX, touch.clientY);
        };

        const onMouseMove = (event: MouseEvent) => drag(event.clientX, event.clientY);
        const onTouchMove = (event: TouchEvent) =>
        {
            const touch = event.touches[0];

            drag(touch.clientX, touch.clientY);
        };

        const onMouseUp = () =>
        {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onMouseUp);
        };

        // Attach listeners
        const dragTarget = handleSelector ? element.querySelector(handleSelector) : element;

        dragTarget?.addEventListener('mousedown', onMouseDown);
        dragTarget?.addEventListener('touchstart', onTouchStart);
        element.addEventListener('mousedown', bringToFront);
        element.addEventListener('touchstart', bringToFront);
        window.addEventListener('resize', adjustPositionWithinViewport);

        adjustPositionWithinViewport();
        bringToFront();

        element.style.visibility = 'visible';

        // Cleanup listeners
        return () =>
        {
            dragTarget?.removeEventListener('mousedown', onMouseDown);
            dragTarget?.removeEventListener('touchstart', onTouchStart);
            element.removeEventListener('mousedown', bringToFront);
            element.removeEventListener('touchstart', bringToFront);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onMouseUp);
            window.removeEventListener('resize', adjustPositionWithinViewport);
        };
    }, [ handleSelector, uniqueKey, defaultPosition ]);

    const portalContent = useMemo(() => <div
        ref={ windowRef }
        className="pointer-events-auto invisible absolute inline-block">
        { children }
    </div>, [ children ]);

    const container = document.getElementById('draggable-windows-container');

    return createPortal(portalContent, container);
};

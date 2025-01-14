import { CSSProperties, FC, PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

let WINDOW_Z_INDEX: number = 1000;
const CURRENT_WINDOWS: Map<HTMLElement, number> = new Map();
const CACHED_POSITIONS: Map<string, { x: number, y: number}> = new Map();

export interface DraggableWindowProps
{
    uniqueKey?: string;
    handleSelector?: string;
    windowPosition?: string;
    disableDrag?: boolean;
    dragStyle?: CSSProperties;
    offsetLeft?: number;
    offsetTop?: number;
    defaultPosition?: 'top-left' | 'center' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const DraggableWindow: FC<PropsWithChildren<DraggableWindowProps>> = props =>
{
    const { uniqueKey = null, handleSelector = '.drag-handler', defaultPosition = 'center', children = null } = props;
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
            const currentZIndex = ++WINDOW_Z_INDEX;

            CURRENT_WINDOWS.set(element, currentZIndex);

            element.style.zIndex = String(currentZIndex);
        };

        const adjustPositionWithinViewport = () =>
        {
            const rect = element.getBoundingClientRect();
            const position = CACHED_POSITIONS.has(uniqueKey) ? { x: 0, y: 0 } : getDefaultPosition();

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let newX = position.x;
            let newY = position.y;

            // Adjust if off-screen
            if (rect.right > viewportWidth) newX = Math.max(0, viewportWidth - rect.width);
            if (rect.bottom > viewportHeight) newY = Math.max(0, viewportHeight - rect.height);
            if (rect.left < 0) newX = 0;
            if (rect.top < 0) newY = 0;

            element.style.transform = `translate(${newX}px, ${newY}px)`;

            CACHED_POSITIONS.set(uniqueKey, { x: newX, y: newY });
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
                    return { x: Math.trunc(viewportWidth - rect.width - 10), y: 10 };
                case 'bottom-left':
                    return { x: 10, y: Math.trunc(viewportHeight - rect.height - 10) };
                case 'bottom-right':
                    return { x: Math.trunc(viewportWidth - rect.width - 10), y: Math.trunc(viewportHeight - rect.height - 10) };
                case 'top-left':
                default:
                    return { x: 10, y: 10 };
            }
        };

        const onResize = () => adjustPositionWithinViewport();

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

        const startDrag = (clientX: number, clientY: number) =>
        {
            bringToFront();

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

        const onMouseMove = (event: MouseEvent) => drag(event.clientX, event.clientY);
        const onTouchMove = (event: TouchEvent) =>
        {
            const touch = event.touches[0];

            drag(touch.clientX, touch.clientY);
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
        window.addEventListener('resize', onResize);

        // Restore position
        if (CACHED_POSITIONS.has(uniqueKey))
        {
            const { x, y } = CACHED_POSITIONS.get(uniqueKey);

            element.style.transform = `translate(${x}px, ${y}px)`;
        }
        else adjustPositionWithinViewport();

        element.style.visibility = 'visible';

        // Cleanup listeners
        return () =>
        {
            dragTarget?.removeEventListener('mousedown', onMouseDown);
            dragTarget?.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onMouseUp);
            window.removeEventListener('resize', onResize);
        };
    }, [ handleSelector, uniqueKey, defaultPosition ]);

    useEffect(() =>
    {
        const element = windowRef.current;

        if (!element) return;

        const bringToFront = () =>
        {
            const currentZIndex = ++WINDOW_Z_INDEX;

            CURRENT_WINDOWS.set(element, currentZIndex);

            element.style.zIndex = String(currentZIndex);
        };

        bringToFront();

        return () =>
        {
            CURRENT_WINDOWS.delete(element);
        };
    }, []);

    return (
        createPortal(
            <div
                ref={ windowRef }
                className="pointer-events-auto invisible absolute inline-block"
            >
                { children }
            </div>, document.getElementById('draggable-windows-container'))
    );
};

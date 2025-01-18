import { DependencyList, RefObject, useEffect } from 'react';

export const useResizeObserver = (props: {
    ref: RefObject<HTMLElement>,
    onResize: (width: number, height: number) => void;
    debounceDelay?: number;
}, deps: DependencyList = []) =>
{
    const { ref = null, onResize = null, debounceDelay = 1 } = props;

    useEffect(() =>
    {
        if (!ref?.current || !onResize) return;

        const previousSize = {
            width: -1,
            height: -1
        };

        let debounceTimeout: ReturnType<typeof setTimeout> = null;

        const resize = (width: number, height: number) =>
        {
            if ((width === previousSize.width) && (height === previousSize.height)) return;

            previousSize.width = width;
            previousSize.height = height;

            if (debounceTimeout) clearTimeout(debounceTimeout);

            debounceTimeout = setTimeout(() => onResize(width, height), debounceDelay);
        };

        const resizeObserver = new ResizeObserver(entries =>
        {
            const entry = entries?.[0];

            if (entry) resize(entry.contentRect.width, entry.contentRect.height);
        });

        resizeObserver.observe(ref.current);

        const initialSize = ref.current.getBoundingClientRect();

        if (initialSize) resize(initialSize.width, initialSize.height);

        return () =>
        {
            if (debounceTimeout) clearTimeout(debounceTimeout);

            resizeObserver.disconnect();
        };
    }, [ref, onResize, debounceDelay, ...deps]);
};

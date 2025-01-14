import { RefObject, useEffect } from 'react';

export const useResizeObserver = (props: { targetRef: RefObject<HTMLElement>, onResize: (width: number, height: number) => void }) =>
{
    const { targetRef: ref = null, onResize = null } = props;

    useEffect(() =>
    {
        if (!ref?.current || !onResize) return;

        const resize = (width: number, height: number) => onResize(width, height);

        const resizeObserver = new ResizeObserver(entries =>
        {
            const entry = entries?.[0];

            if (!entry) return;

            resize(entry.contentRect.width, entry.contentRect.height);
        });

        resizeObserver.observe(ref.current);

        const initialSize = ref.current.getBoundingClientRect();

        if (initialSize) resize(initialSize.width, initialSize.height);

        return () =>
        {
            resizeObserver.disconnect();
        };
    }, []);
};

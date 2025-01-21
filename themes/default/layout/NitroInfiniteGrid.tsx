import { useResizeObserver } from '#base/hooks';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Fragment, ReactElement, useRef, useState } from 'react';

export const NitroInfiniteGrid = <T,>(props: {
    items: T[];
    itemWidth?: number;
    itemHeight?: number;
    overrideColumnCount?: number;
    itemRender?: (item: T, index?: number) => ReactElement;
}) =>
{
    const { items = [], itemWidth = 45, itemHeight = 45, overrideColumnCount = 0, itemRender = null } = props;
    const [ elementSize, setElementSize ] = useState({ width: 0, height: 0 });
    const [ columnCount, setColumnCount ] = useState(0);
    const [ isReady, setIsReady ] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: (columnCount > 0) ? Math.max(1, Math.ceil((items?.length ?? 0) / columnCount)) : 0,
        overscan: 1,
        getScrollElement: () => elementRef.current,
        estimateSize: () => itemHeight
    });

    const onResize = (size: { width: number, height: number }) =>
    {
        if((size.width === elementSize.width) && (size.height === elementSize.height)) return;

        setElementSize(size);
        setColumnCount((overrideColumnCount > 0) ? overrideColumnCount : Math.max(1, Math.min(12, Math.ceil(size.width / (itemWidth + 4)))));

        if(!isReady) setIsReady(true);
    }

    useResizeObserver({
        ref: elementRef,
        onResize
    });

    if (!isReady) {
        return <div ref={elementRef} className="overflow-y-auto size-full" />;
    }

    return (
        <div
            ref={ elementRef }
            className="overflow-y-auto size-full">
            <div
                className="flex flex-col w-full *:pb-1 last:*:pb-0 relative"
                style={ {
                    height: `${ virtualizer.getTotalSize() }px`
                } }>
                { virtualizer.getVirtualItems().map(virtualRow => (
                    <div
                        key={ virtualRow.key }
                        data-index={ virtualRow.index }
                        className={ `grid grid-cols-${ columnCount } gap-1 absolute top-0 left-0 w-full` }
                        style={ {
                            height: `${ virtualRow.size }px`,
                            transform: `translateY(${ virtualRow.start }px)`
                        } }>
                        { Array.from(Array(columnCount)).map((e, i) =>
                        {
                            const item = items[i + (virtualRow.index * columnCount)];

                            return (
                                <Fragment key={ `${ virtualRow.key }-${ i }` }>
                                    { (item && itemRender(item, i)) ?? null }
                                </Fragment>
                            );
                        }) }
                    </div>
                )) }
            </div>
        </div>
    );
};

import { useResizeObserver } from '#base/hooks';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Fragment, ReactElement, useMemo, useRef, useState } from 'react';

export const NitroInfiniteGrid = <T,>(props: {
    items: T[];
    itemWidth?: number;
    itemHeight?: number;
    itemRender?: (item: T, index?: number) => ReactElement;
}) =>
{
    const { items = [], itemWidth = 45, itemHeight = 45, itemRender = null } = props;
    const [ columnCount, setColumnCount ] = useState(1);
    const randomKey = useMemo(() => crypto.randomUUID(), []);
    const elementRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: Math.max(1, Math.ceil((items?.length ?? 0) / columnCount)),
        overscan: 1,
        getScrollElement: () => elementRef.current,
        estimateSize: () => itemHeight
    });

    const onResize = (width: number, height: number) => setColumnCount(Math.max(1, Math.ceil(width / itemWidth)));

    useResizeObserver({
        ref: elementRef,
        onResize
    });

    const virtualItems = virtualizer.getVirtualItems();

    return (
        <div
            key={ randomKey }
            ref={ elementRef }
            className="overflow-y-auto size-full">
            <div
                className="flex flex-col w-full *:pb-1 last:*:pb-0 relative"
                style={ {
                    height: `${ virtualizer.getTotalSize() }px`
                } }>
                { virtualItems.map(virtualRow => (
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

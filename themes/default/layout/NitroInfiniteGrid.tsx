import { useResizeObserver } from '#base/hooks';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Fragment, ReactElement, useEffect, useRef, useState } from 'react';

export const NitroInfiniteGrid = <T,>(props: {
    items: T[];
    itemWidth?: number;
    itemHeight?: number;
    itemRender?: (item: T, index?: number) => ReactElement;
}) =>
{
    const { items = [], itemWidth = 42, itemHeight = 42, itemRender = null } = props;
    const [ elementSize, setElementSize ] = useState({ width: 1, height: 1 });
    const [ gridSize, setGridSize ] = useState({ columns: 1, rows: 1 });
    const elementRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: gridSize.rows,
        overscan: gridSize.columns,
        getScrollElement: () => elementRef.current,
        estimateSize: () => itemHeight
    });

    useResizeObserver({
        targetRef: elementRef,
        onResize: (width, height) => setElementSize({ width, height })
    });

    useEffect(() =>
    {
        if(!items || !elementSize) return;

        const columns = Math.max(1, Math.floor(elementSize.width / itemWidth));
        const rows = Math.max(1, Math.ceil(items.length / columns));

        setGridSize({ columns, rows });
    }, [ items, elementSize, itemWidth ]);

    const virtualItems = virtualizer.getVirtualItems();

    return (
        <div
            ref={ elementRef }
            className="overflow-y-auto size-full">
            <div
                className="flex flex-col w-full *:pb-1 relative"
                style={ {
                    height: virtualizer.getTotalSize()
                } }>
                { virtualItems.map(virtualRow => (
                    <div
                        key={ virtualRow.key }
                        ref={ virtualizer.measureElement }
                        className={ `grid grid-cols-${ gridSize.columns } gap-1 absolute top-0 left-0 last:pb-0 w-full` }
                        style={ {
                            height: virtualRow.size,
                            transform: `translateY(${ virtualRow.start }px)`
                        } }>
                        { Array.from(Array(gridSize.columns)).map((e, i) =>
                        {
                            const item = items[i + (virtualRow.index * gridSize.columns)];

                            if(!item) return <Fragment
                                key={ virtualRow.index + i + 'b' } />;

                            return (
                                <Fragment key={ i }>
                                    { itemRender(item, i) }
                                </Fragment>
                            );
                        }) }
                    </div>
                )) }
            </div>
        </div>
    );
};

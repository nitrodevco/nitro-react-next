import { classNames } from '#base/utils';
import { DetailedHTMLProps, DOMAttributes, FC, HTMLAttributes, MouseEventHandler } from 'react';

const classes = {
    base: 'flex flex-col items-center justify-center cursor-pointer overflow-hidden relative bg-center bg-no-repeat w-full rounded-md border-2',
    unseen: 'bg-green-500 bg-opacity-40',
    state: {
        active: 'border-card-grid-item-active-border bg-card-grid-item-active',
        inactive: 'border-card-grid-item-border bg-card-grid-item'
    }
};

export const NitroInfiniteGridItem: FC<{
    gridItemActive?: boolean;
    gridItemUnseen?: boolean;
    onMouseEvent?: MouseEventHandler<HTMLDivElement>;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { gridItemActive = false, gridItemUnseen = false, onDoubleClick = null, onMouseDown = null, onMouseOut = null, onMouseUp = null, onMouseEvent = null, className = null, ref = null, ...rest } = props;

    const getDomAttributes = () =>
    {
        const handlers: DOMAttributes<HTMLDivElement> = {};

        if(onDoubleClick) handlers.onDoubleClick = onDoubleClick;
        if(onMouseDown) handlers.onMouseDown = onMouseDown;
        if(onMouseOut) handlers.onMouseOut = onMouseOut;
        if(onMouseUp) handlers.onMouseUp = onMouseUp;

        if(onMouseEvent)
        {
            handlers.onDoubleClick = onMouseEvent;
            handlers.onMouseDown = onMouseEvent;
            handlers.onMouseOut = onMouseEvent;
            handlers.onMouseUp = onMouseEvent;
        }

        return handlers;
    }

    return (
        <div
            ref={ ref }
            className={ classNames(
                classes.base,
                gridItemActive ? classes.state.active : classes.state.inactive,
                gridItemUnseen && classes.unseen,
                className
            ) }
            { ...getDomAttributes() }
            { ...rest } />
    );
};

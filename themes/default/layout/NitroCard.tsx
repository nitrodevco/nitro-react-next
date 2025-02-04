import { classNames, DraggableWindow, DraggableWindowProps } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, MouseEvent } from 'react';
import { NitroItemCountBadge } from './NitroItemCountBadge';

const NitroCardRoot: FC<DraggableWindowProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { uniqueKey = null, handleSelector = '.drag-handler', defaultPosition = 'center', className = null, ref = null, ...rest } = props;

    return (
        <DraggableWindow
            uniqueKey={ uniqueKey }
            handleSelector={ handleSelector }
            defaultPosition={ defaultPosition }>
            <div
                ref={ ref }
                className={ classNames(
                    'flex flex-col rounded-md shadow-sm border-2 border-card-border overflow-hidden min-w-full min-h-full max-w-full max-h-full resize',
                    className
                ) }
                { ...rest } />
        </DraggableWindow>
    );
};

const NitroCardHeader: FC<{
    headerText: string;
    onCloseClick?: (event: MouseEvent) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { headerText = '', onCloseClick = null, className = null, ref = null, ...rest } = props;

    const onMouseDown = (event: MouseEvent<HTMLDivElement>) =>
    {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    };

    return (
        <div ref={ ref } className={ classNames('relative flex items-center justify-center flex-col drag-handler min-h-card-header max-h-card-header bg-card-header', className) }>
            <div className="flex w-full items-center justify-center ">
                <span className="text-xl text-white drop-shadow-lg">
                    { headerText }
                </span>
                <div className="ubuntu-close-button absolute right-2 flex cursor-pointer items-center justify-center p-[2px]" onClick={ onCloseClick } onMouseDownCapture={ onMouseDown } />
            </div>
        </div>
    );
};

const NitroCardContent: FC<{
    isLoading?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { isLoading = false, className = null, children = null, ref = null, ...rest } = props;

    return (
        <div
            ref={ ref }
            className={ classNames(
                'flex flex-col overflow-auto bg-card-content-area p-2 h-full',
                className
            ) }
            { ...rest }>
            { isLoading &&
                <div className="absolute left-0 top-0 z-10 size-full bg-muted opacity-50" /> }
            { children }
        </div>
    );
};

const NitroCardTabs: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { className = null, ref = null, ...rest } = props;

    return (
        <div
            ref={ ref }
            className={ classNames(
                'justify-center gap-0.5 flex bg-card-tabs min-h-card-tabs max-h-card-tabs pt-1 border-b border-card-border px-2',
                className)
            }
            { ...rest } />
    );
};

const NitroCardTabItem: FC<{
    isActive?: boolean;
    count?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { isActive = false, count = 0, className = null, children = null, ref = null, ...rest } = props;

    return (
        <div
            ref={ ref }
            className={ classNames(
                'overflow-hidden relative cursor-pointer rounded-t-md flex bg-card-tab-item px-3 py-1 z-1 border-card-border border-t border-l border-r before:absolute before:w-[93%] before:h-[3px] before:rounded-md before:top-[1.5px] before:left-0 before:right-0 before:m-auto before:z-1 before:bg-[#C2C9D1]',
                isActive && 'bg-card-tab-item-active -mb-[1px] before:bg-white',
                className)
            }
            { ...rest }>
            <div className="flex shrink-0 items-center justify-center gap-1">
                { children }
            </div>
            { (count > 0) &&
                <NitroItemCountBadge count={ count } /> }
        </div>
    );
};

export const NitroCard = Object.assign(NitroCardRoot, {
    Header: NitroCardHeader,
    Content: NitroCardContent,
    Tabs: NitroCardTabs,
    TabItem: NitroCardTabItem
});

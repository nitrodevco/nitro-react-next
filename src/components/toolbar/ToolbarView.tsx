import { useToolbar } from '#base/hooks';
import { FC } from 'react';

export const ToolbarView: FC = () =>
{
    const toolbarState = useToolbar();

    return (
        <div className="absolute bottom-0 left-0 flex h-[55px] w-full items-center justify-between gap-2 px-3 py-1">
            hello
        </div>
    );
};

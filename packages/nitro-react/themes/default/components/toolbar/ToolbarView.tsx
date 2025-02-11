import { VisitDesktop } from '#base/api';
import { useVisibilityStore } from '#base/stores';
import { CreateLinkEvent } from '@nitrodevco/nitro-renderer';
import { FC } from 'react';
import { ToolbarItemView } from './ToolbarItemView';

export const ToolbarView: FC<{ isInRoom: boolean }> = props =>
{
    const { isInRoom } = props;

    return (
        <div className="absolute bottom-0 left-0 flex h-[55px] w-full items-center justify-between gap-2 bg-toolbar/95 px-3 py-1">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    {isInRoom &&
                        <ToolbarItemView icon="habbo" onClick={event => VisitDesktop()} />}
                    {!isInRoom &&
                        <ToolbarItemView icon="house" onClick={event => CreateLinkEvent('navigator/goto/home')} />}
                    <ToolbarItemView icon="rooms" onClick={event => useVisibilityStore.setState({ navigationVisible: true })} />
                    <ToolbarItemView icon="inventory" onClick={event => useVisibilityStore.setState({ inventoryVisible: true })} />
                    <ToolbarItemView icon="catalog" onClick={event => useVisibilityStore.setState({ catalogVisible: true })} />
                </div>
                chat container
            </div>
            <div className="flex items-center gap-2">
                <div className="flex gap-2">
                    friend icon
                    chat icon
                </div>
            </div>
        </div>
    );
};

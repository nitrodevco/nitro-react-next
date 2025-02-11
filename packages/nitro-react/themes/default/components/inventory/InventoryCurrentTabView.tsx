import { RoomPreviewer } from '@nitrodevco/nitro-renderer';
import { FC } from 'react';

export const InventoryCurrentTabComponent: FC<{
    currentTabIndex: number;
    tabs: { name: string; component: FC<{ roomPreviewer: RoomPreviewer }>; unseenCategory: number; }[];
    roomPreviewer: RoomPreviewer;
}> = props =>
{
    const { currentTabIndex = -1, tabs = null, roomPreviewer = null } = props;

    if ((currentTabIndex === -1) || !tabs?.length) return null;

    const currentTab = tabs[currentTabIndex];

    if (!currentTab || !currentTab.component) return null;

    const TabComponent = currentTab.component;

    return <TabComponent roomPreviewer={roomPreviewer} />;
};

import { AttemptBotPlacement, IBotItem, UnseenItemCategoryEnum } from '#base/api';
import { useInventoryStore, useVisibilityStore } from '#base/stores';
import { NitroAvatarImage, NitroInfiniteGridItem } from '#themes/default';
import { MouseEventType } from '@nitrodevco/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';

export const InventoryBotItemView: FC<{
    botItem: IBotItem;
    selectedBotItem: IBotItem
    selectBotItem: (botItem: IBotItem) => void;
}> = props =>
    {
        const { botItem = null, selectedBotItem = null, selectBotItem = null } = props;
        const [isMouseDown, setMouseDown] = useState(false);
        const isUnseen = useInventoryStore(state =>
        {
            const unseenItems = state.unseenItems;
            return unseenItems.get(UnseenItemCategoryEnum.Bot)?.indexOf(botItem.botData.id) >= 0;
        });

        const onMouseEvent = (event: MouseEvent) =>
        {
            switch (event.type)
            {
                case MouseEventType.MOUSE_DOWN:
                    selectBotItem(botItem);
                    setMouseDown(true);
                    return;
                case MouseEventType.MOUSE_UP:
                    setMouseDown(false);
                    return;
                case MouseEventType.ROLL_OUT:
                    if (!isMouseDown || !(botItem === selectedBotItem)) return;

                    if (AttemptBotPlacement(botItem)) useVisibilityStore.setState({ inventoryVisible: false });
                    return;
                case 'dblclick':
                    if (AttemptBotPlacement(botItem)) useVisibilityStore.setState({ inventoryVisible: false });
                    return;
            }
        };

        return (
            <NitroInfiniteGridItem
                gridItemActive={botItem === selectedBotItem}
                gridItemUnseen={isUnseen}
                onMouseEvent={onMouseEvent}>
                <NitroAvatarImage className="bg-[center_-35px]!" avatarDirection={3} avatarFigure={botItem.botData.figure} avatarHeadOnly={true} />
            </NitroInfiniteGridItem>
        );
    };

import { AttemptBotPlacement, IBotItem, UnseenItemCategory } from '#base/api';
import { useInventoryStore, useVisibilityStore } from '#base/stores';
import { NitroInfiniteGridItem } from '#themes/default/layout';
import { NitroAvatarImage } from '#themes/default/layout/NitroAvatarImage.tsx';
import { MouseEventType } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';

export const InventoryBotItemView: FC<{
    botItem: IBotItem;
    selectedBotItem: IBotItem
    selectBotItem: (botItem: IBotItem) => void;
}> = props =>
{
    const { botItem = null, selectedBotItem = null, selectBotItem = null } = props;
    const [ isMouseDown, setMouseDown ] = useState(false);
    const isUnseen = useInventoryStore(state =>
    {
        const unseenItems = state.unseenItems;
        return unseenItems.get(UnseenItemCategory.BOT)?.indexOf(botItem.botData.id) >= 0;
    });

    const onMouseEvent = (event: MouseEvent) =>
    {
        switch(event.type)
        {
            case MouseEventType.MOUSE_DOWN:
                selectBotItem(botItem);
                setMouseDown(true);
                return;
            case MouseEventType.MOUSE_UP:
                setMouseDown(false);
                return;
            case MouseEventType.ROLL_OUT:
                if(!isMouseDown || !(botItem === selectedBotItem)) return;

                if(AttemptBotPlacement(botItem)) useVisibilityStore.setState({ inventoryVisible: false });
                return;
            case 'dblclick':
                if(AttemptBotPlacement(botItem)) useVisibilityStore.setState({ inventoryVisible: false });
                return;
        }
    };

    return (
        <NitroInfiniteGridItem
            gridItemActive={ botItem === selectedBotItem }
            gridItemUnseen={ isUnseen }
            onMouseEvent={ onMouseEvent }>
                <NitroAvatarImage className="bg-[center_-35px]" avatarDirection={ 3 } avatarFigure={ botItem.botData.figure } avatarHeadOnly={ true } />
        </NitroInfiniteGridItem>
    );
};

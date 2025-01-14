import { AttemptItemPlacement, GetUnlockedCountForGroup, IGroupItem } from '#base/api';
import { useInventoryStore, useVisibilityStore } from '#base/stores';
import { classNames, styleNames } from '#base/utils';
import { NitroInfiniteGridItem, NitroLimitedEditionNumber } from '#themes/default/layout';
import { MouseEventType } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';

export const InventoryFurnitureItemView: FC<{
    groupItem: IGroupItem
}> = props =>
{
    const { groupItem = null } = props;
    const [ isMouseDown, setMouseDown ] = useState(false);
    const selectedFurniItem = useInventoryStore(state => state.selectedFurniItem);
    const selectFurniItem = useInventoryStore(state => state.selectFurniItem);

    const onMouseEvent = (event: MouseEvent) =>
    {
        switch(event.type)
        {
            case MouseEventType.MOUSE_DOWN:
                selectFurniItem(groupItem);
                setMouseDown(true);
                return;
            case MouseEventType.MOUSE_UP:
                setMouseDown(false);
                return;
            case MouseEventType.ROLL_OUT:
                if(!isMouseDown || !(groupItem === selectedFurniItem)) return;

                if(AttemptItemPlacement(groupItem)) useVisibilityStore.setState({ inventoryVisible: false });
                return;
            case 'dblclick':
                if(AttemptItemPlacement(groupItem)) useVisibilityStore.setState({ inventoryVisible: false });
                return;
        }
    };

    const unlockedCount = GetUnlockedCountForGroup(groupItem);
    const imageUrl = groupItem.iconUrl;
    const uniqueNumber = groupItem?.stuffData?.uniqueNumber ?? 0;

    return (
        <NitroInfiniteGridItem
            gridItemActive={ selectedFurniItem === groupItem }
            className={ classNames(
                (groupItem.stuffData.uniqueNumber > 0) && 'unique-item',
                groupItem.hasUnseenItems && 'bg-green-500 bg-opacity-40',
            ) }
            style={ styleNames(
                imageUrl && imageUrl.length && !(uniqueNumber > 0) && {
                    backgroundImage: `url(${ imageUrl })`
                }
            ) }
            onMouseEvent={ onMouseEvent }>
            { (unlockedCount > 1) &&
                <div className="absolute align-middle rounded bg-red-700 bg-opacity-80 text-white border-black border top-[2px] right-[2px] text-[9.5px] p-[2px] z-[1] leading-[8px]">{ unlockedCount }</div> }
            { (uniqueNumber > 0) &&
                <>
                    <div
                        className="size-full unique-bg-override"
                        style={ {
                            backgroundImage: `url(${ imageUrl })`
                        } } />
                    <div className="absolute bottom-0 unique-item-counter">
                        <NitroLimitedEditionNumber value={ uniqueNumber } />
                    </div>
                </> }
        </NitroInfiniteGridItem>
    )
};

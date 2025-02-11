import { AttemptItemPlacement, GetUnlockedCountForGroup, IGroupItem } from '#base/api';
import { useVisibilityStore } from '#base/stores';
import { classNames } from '#base/utils';
import { NitroFurniIcon, NitroInfiniteGridItem, NitroLimitedEditionNumber } from '#themes/default';
import { MouseEventType } from '@nitrodevco/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';

export const InventoryFurnitureItemView: FC<{
    groupItem: IGroupItem;
    selectedFurniItem: IGroupItem;
    selectFurniItem: (groupItem: IGroupItem) => void;
}> = props =>
    {
        const { groupItem = null, selectedFurniItem = null, selectFurniItem = null } = props;
        const [isMouseDown, setMouseDown] = useState(false);

        const onMouseEvent = (event: MouseEvent) =>
        {
            switch (event.type)
            {
                case MouseEventType.MOUSE_DOWN:
                    selectFurniItem(groupItem);
                    setMouseDown(true);
                    return;
                case MouseEventType.MOUSE_UP:
                    setMouseDown(false);
                    return;
                case MouseEventType.ROLL_OUT:
                    if (!isMouseDown || (groupItem !== selectedFurniItem)) return;

                    if (AttemptItemPlacement(groupItem)) useVisibilityStore.setState({ inventoryVisible: false });
                    return;
                case 'dblclick':
                    if (AttemptItemPlacement(groupItem)) useVisibilityStore.setState({ inventoryVisible: false });
                    return;
            }
        };

        const unlockedCount = GetUnlockedCountForGroup(groupItem);
        const imageUrl = groupItem.iconUrl;
        const uniqueNumber = groupItem?.stuffData?.uniqueNumber ?? 0;

        return (
            <NitroInfiniteGridItem
                gridItemActive={selectedFurniItem === groupItem}
                gridItemUnseen={groupItem.hasUnseenItems}
                className={classNames(
                    (groupItem.stuffData.uniqueNumber > 0) && 'unique-item'
                )}
                onMouseEvent={onMouseEvent}>
                {(unlockedCount > 1) &&
                    <div className="absolute align-middle rounded-md bg-red-700 bg-opacity-80 text-white border-black border top-[2px] right-[2px] text-[9.5px] p-[2px] z-1 leading-[8px]">{unlockedCount}</div>}
                <NitroFurniIcon
                    className="unique-bg-override"
                    url={imageUrl} />
                {(uniqueNumber > 0) &&
                    <>
                        <div className="absolute bottom-0 unique-item-counter">
                            <NitroLimitedEditionNumber value={uniqueNumber} />
                        </div>
                    </>}
            </NitroInfiniteGridItem>
        );
    };

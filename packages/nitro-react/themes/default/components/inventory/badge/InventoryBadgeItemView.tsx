import { UnseenItemCategoryEnum } from '#base/api';
import { useInventoryStore } from '#base/stores';
import { NitroBadgeImage, NitroInfiniteGridItem } from '#themes/default';
import { MouseEventType } from '@nitrodevco/nitro-renderer';
import { FC, MouseEvent } from 'react';

export const InventoryBadgeItemView: FC<{
    badgeId: number;
    badgeCode: string;
    selectedBadgeCode: string
    selectBadgeCode: (badgeCode: string) => void;
    toggleBadgeCode: (badgeCode: string) => void;
}> = props =>
    {
        const { badgeId = -1, badgeCode = null, selectedBadgeCode = null, selectBadgeCode = null, toggleBadgeCode = null } = props;
        const isUnseen = useInventoryStore(state =>
        {
            const unseenItems = state.unseenItems;
            return unseenItems.get(UnseenItemCategoryEnum.Badge)?.indexOf(badgeId) >= 0;
        });

        const onMouseEvent = (event: MouseEvent) =>
        {
            switch (event.type)
            {
                case MouseEventType.MOUSE_DOWN:
                    selectBadgeCode(badgeCode);
                    return;
                case 'dblclick':
                    toggleBadgeCode(badgeCode);
                    return;
            }
        };

        return (
            <NitroInfiniteGridItem
                gridItemActive={selectedBadgeCode === badgeCode}
                gridItemUnseen={isUnseen}
                onMouseEvent={onMouseEvent}>
                <NitroBadgeImage badgeCode={badgeCode} />
            </NitroInfiniteGridItem>
        );
    };

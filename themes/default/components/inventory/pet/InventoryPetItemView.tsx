import { AttemptPetPlacement, IPetItem, UnseenItemCategory } from '#base/api';
import { useInventoryStore, useVisibilityStore } from '#base/stores';
import { NitroInfiniteGridItem, NitroPetImageView } from '#themes/default/layout';
import { MouseEventType } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';

export const InventoryPetItemView: FC<{
    petItem: IPetItem;
    selectedPetItem: IPetItem
    selectPetItem: (petItem: IPetItem) => void;
}> = props =>
{
    const { petItem = null, selectedPetItem = null, selectPetItem = null } = props;
    const [ isMouseDown, setMouseDown ] = useState(false);
    const isUnseen = useInventoryStore(state => state.isUnseen);

    const onMouseEvent = (event: MouseEvent) =>
    {
        switch(event.type)
        {
            case MouseEventType.MOUSE_DOWN:
                selectPetItem(petItem);
                setMouseDown(true);
                return;
            case MouseEventType.MOUSE_UP:
                setMouseDown(false);
                return;
            case MouseEventType.ROLL_OUT:
                if(!isMouseDown || !(petItem === selectedPetItem)) return;

                if(AttemptPetPlacement(petItem)) useVisibilityStore.setState({ inventoryVisible: false });
                return;
            case 'dblclick':
                if(AttemptPetPlacement(petItem)) useVisibilityStore.setState({ inventoryVisible: false });
                return;
        }
    };

    return (
        <NitroInfiniteGridItem
            gridItemActive={ petItem === selectedPetItem }
            gridItemUnseen={ isUnseen(UnseenItemCategory.PET, petItem.petData.id) }
            onMouseEvent={ onMouseEvent }>
            <NitroPetImageView direction={ 3 } petFigure={ petItem.petData.figureData.figuredata } headOnly={ true } />
            </NitroInfiniteGridItem>
    );
};

import { IGroupItem, LocalizeText } from '#base/api';
import { useInventoryStore } from '#base/stores/index.ts';
import { NitroButton, NitroInput } from '#themes/default/layout';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

export const InventoryFurnitureSearchView: FC<{
    groupItems: IGroupItem[];
    setGroupItems: Dispatch<SetStateAction<IGroupItem[]>>;
}> = props =>
{
    const { groupItems = [], setGroupItems = null } = props;
    const searchValue = useInventoryStore(state => state.furniSearchValue);
    const setSearchValue = useInventoryStore(state => state.setFurniSearchValue);

    useEffect(() =>
    {
        if(!groupItems) return;

        let filteredGroupItems = [ ...groupItems ];

        if(searchValue && searchValue.length)
        {
            const comparison = searchValue.toLocaleLowerCase();

            filteredGroupItems = groupItems.filter(item =>
            {
                if(comparison && comparison.length)
                {
                    if(item.name.toLocaleLowerCase().includes(comparison)) return item;
                }

                return null;
            });
        }

        setGroupItems(filteredGroupItems);
    }, [ groupItems, setGroupItems, searchValue ]);

    return (
        <div className="flex gap-1">
            <NitroInput
                inputSize="sm"
                placeholder={ LocalizeText('generic.search') }
                value={ searchValue }
                onChange={ event => setSearchValue(event.target.value) } />
            <NitroButton>
                <FaSearch className="fa-icon" />
            </NitroButton>
        </div>
    );
};

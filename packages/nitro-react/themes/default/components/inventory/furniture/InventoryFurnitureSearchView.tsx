import { FurniCategoryEnum, IGroupItem } from '#base/api';
import { useLocalization } from '#base/hooks';
import { useInventoryStore } from '#base/stores';
import { NitroButton, NitroInput } from '#themes/default';
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
        const translation = useLocalization();

        const getGroupItemName = (groupItem: IGroupItem) =>
        {
            if (!groupItem) return '';

            let key = '';

            switch (groupItem.category)
            {
                case FurniCategoryEnum.Poster:
                    key = (`poster_${groupItem.stuffData.getLegacyString()}_name`);
                    break;
                case FurniCategoryEnum.TraxSong:
                    return 'SONG_NAME';
                default:
                    key = groupItem.isWallItem ? `wallItem.name.${groupItem.type}` : `roomItem.name.${groupItem.type}`;
            }

            return translation(key);
        }

        useEffect(() =>
        {
            if (!groupItems) return;

            let filteredGroupItems = [...groupItems];

            if (searchValue && searchValue.length)
            {
                const comparison = searchValue.toLocaleLowerCase();

                filteredGroupItems = groupItems.filter(item =>
                {
                    if (comparison && comparison.length)
                    {
                        if (getGroupItemName(item).toLocaleLowerCase().includes(comparison)) return item;
                    }

                    return null;
                });
            }

            setGroupItems(filteredGroupItems);
        }, [groupItems, setGroupItems, searchValue]);

        return (
            <div className="flex gap-1">
                <NitroInput
                    inputSize="sm"
                    placeholder={translation('generic.search')}
                    value={searchValue}
                    onChange={event => setSearchValue(event.target.value)} />
                <NitroButton>
                    <FaSearch className="fa-icon" />
                </NitroButton>
            </div>
        );
    };

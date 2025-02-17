import { ProcessSearchWithFurnitureData } from '#base/api';
import { useLocalization } from '#base/hooks';
import { useCatalogStore } from '#base/stores';
import { NitroButton, NitroInput } from '#themes/default';
import { GetSessionDataManager, IFurnitureData } from '@nitrodevco/nitro-renderer';
import { FC, useEffect, useRef, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useShallow } from 'zustand/shallow';

export const CatalogSearchView: FC<{}> = props =>
{
    const [searchValue, setSearchValue] = useState('');
    const [
        catalogType,
        offerNodes,
        setSearchResult,
    ] = useCatalogStore(
        useShallow(state => [
            state.catalogType,
            state.offerNodes,
            state.setSearchResult,
        ]));
    const translation = useLocalization();
    const furnitureData = useRef<IFurnitureData[]>(null);

    useEffect(() =>
    {
        let search = searchValue?.toLocaleLowerCase().replace(' ', '');

        if (!search || !search.length)
        {
            setSearchResult(null, null, null);

            return;
        }

        if (!furnitureData.current) furnitureData.current = GetSessionDataManager().getAllFurnitureData();

        const timeout = setTimeout(() =>
        {
            const searchResult = ProcessSearchWithFurnitureData(search, catalogType, furnitureData.current, offerNodes);

            setSearchResult(searchResult.searchValue, searchResult.offers, searchResult.nodes);
            //setCurrentPage((new CatalogPage(-1, 'default_3x3', new PageLocalization([], []), offers, false, 1) as ICatalogPage));
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    return (
        <div className="flex gap-1">
            <div className="flex w-full items-center realtive">
                <NitroInput
                    placeholder={translation('generic.search')}
                    value={searchValue}
                    inputSize="sm"
                    onChange={event => setSearchValue(event.target.value)} />
            </div>
            {(!searchValue || !searchValue.length) &&
                <NitroButton className="catalog-search-button">
                    <FaSearch className="fa-icon" />
                </NitroButton>}
            {searchValue && !!searchValue.length &&
                <NitroButton className="catalog-search-button" onClick={event => setSearchValue('')}>
                    <FaTimes className="fa-icon" />
                </NitroButton>}
        </div>
    );
};

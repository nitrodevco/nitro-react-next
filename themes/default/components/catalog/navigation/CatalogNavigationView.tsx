import { ICatalogNode } from '#base/api/index.ts';
import { useCatalogStore } from '#base/stores/useCatalogStore.ts';
import { FC } from 'react';
import { useShallow } from 'zustand/shallow';
import { CatalogNavigationItemView } from './CatalogNavigationItemView';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export const CatalogNavigationView: FC<{
    node: ICatalogNode;
}> = props =>
{
    const { node = null } = props;
    const [
        activeNodes,
        expandedNodes,
        searchResult,
        selectNode
    ] = useCatalogStore(
        useShallow(state => [
            state.activeNodes,
            state.expandedNodes,
            state.searchResult,
            state.selectNode
        ]));
    const isNodeActive = (node: ICatalogNode) => (activeNodes.indexOf(node) >= 0);
    const isNodeExpanded = (node: ICatalogNode) => (expandedNodes.indexOf(node) >= 0);

    return (
        <div className="flex flex-col size-full border-[#b6bec5] bg-[#cdd3d9] border-[2px] border-[solid] rounded p-1 overflow-hidden">
            <div className="flex flex-col overflow-x-hidden overflow-y-auto">
                { searchResult && (searchResult.filteredNodes?.length > 0) && searchResult.filteredNodes.map((n, index) => <CatalogNavigationItemView key={ index } node={ n } isNodeActive={ isNodeActive } isNodeExpanded={ isNodeExpanded } selectNode={ selectNode } />) }
                { !searchResult && <CatalogNavigationSetView node={ node } isNodeActive={ isNodeActive } isNodeExpanded={ isNodeExpanded } selectNode={ selectNode } /> }
            </div>
        </div>
    );
};

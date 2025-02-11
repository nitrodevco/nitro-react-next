import { ICatalogNode } from '#base/api';
import { useCatalogStore } from '#base/stores';
import { FC, useEffect, useRef } from 'react';
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
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        if(!elementRef?.current) return;

        const targetNode = activeNodes?.[activeNodes.length - 1];

        if(!targetNode || !targetNode.element) return;

        if(targetNode.children?.length)
        {
            targetNode.element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
        else
        {
           targetNode.element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }, [ activeNodes ]);

    return (
        <div
            ref={ elementRef }
            className="flex flex-col size-full border-[#b6bec5] bg-[#cdd3d9] border-[2px] rounded-md p-1 overflow-hidden">
            <div className="flex flex-col overflow-x-hidden overflow-y-auto">
                { searchResult && (searchResult.filteredNodes?.length > 0) && searchResult.filteredNodes.map((n, index) => <CatalogNavigationItemView key={ n.pageId } node={ n } activeNodes={ activeNodes } expandedNodes={ expandedNodes } selectNode={ selectNode } />) }
                { !searchResult && <CatalogNavigationSetView node={ node } activeNodes={ activeNodes } expandedNodes={ expandedNodes } selectNode={ selectNode } /> }
            </div>
        </div>
    );
};

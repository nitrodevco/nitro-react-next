import { CatalogType, ICatalogNode, IPurchasableOffer } from '#base/api/index.ts';
import { NodeData } from '@nitrots/nitro-renderer';
import { create } from 'zustand';

interface CatalogSlice
{
    catalogType: string;
    rootNode: ICatalogNode;
    activeNodes: ICatalogNode[];
    expandedNodes: ICatalogNode[];
    offerNodes: { [key: string]: ICatalogNode[] };
    searchResult: { searchValue: string; offers: IPurchasableOffer[]; filteredNodes: ICatalogNode[] };
    navigationVisible: boolean;
    catalogNeedsUpdate: boolean;
    processNodeData: (nodeData: NodeData) => void;
    selectNode: (targetNode: ICatalogNode) => void;
    setSearchResult: (searchValue: string, offers: IPurchasableOffer[], filteredNodes: ICatalogNode[]) => void;
    setCatalogNeedsUpdate: (flag: boolean) => void;
}

export const useCatalogStore = create<CatalogSlice>(set => ({
    catalogType: CatalogType.NORMAL,
    rootNode: null,
    activeNodes: [],
    expandedNodes: [],
    offerNodes: {},
    searchResult: { searchValue: '', offers: [], filteredNodes: [] },
    navigationVisible: true,
    catalogNeedsUpdate: true,
    processNodeData: (nodeData: NodeData) => set(state =>
    {
        if (!nodeData) return state;

        const offerNodes: { [key: string]: ICatalogNode[] } = {};

        const getCatalogNode = (node: NodeData, depth: number, parent: ICatalogNode) =>
        {
            const catalogNode: ICatalogNode = {
                depth,
                parent,
                localization: node.localization,
                pageId: node.pageId,
                pageName: node.pageName,
                iconId: node.icon,
                children: [],
                offerIds: node.offerIds,
                isVisible: node.visible,
            };

            for (const offerId of catalogNode.offerIds)
            {
                let nodes = offerNodes[offerId.toString()];

                if (!nodes)
                {
                    nodes = [];
                    offerNodes[offerId.toString()] = nodes;
                }

                nodes.push(catalogNode);
            }

            depth++;

            for (const child of node.children) catalogNode.children.push(getCatalogNode(child, depth, catalogNode));

            return catalogNode;
        };

        const rootNode = getCatalogNode(nodeData, -2, null);

        return { rootNode, offerNodes };
    }),
    selectNode: (targetNode: ICatalogNode) => set(state =>
    {
        //cancelObjectMover();

        if (targetNode.parent === state.rootNode)
        {
            if (targetNode.children.length)
            {
                for (const child of targetNode.children)
                {
                    if (!child.isVisible) continue;

                    targetNode = child;

                    break;
                }
            }
        }

        const previouslyActive = (state.activeNodes.indexOf(targetNode) >= 0);
        const activeNodes: ICatalogNode[] = [];
        const expandedNodes: ICatalogNode[] = [];

        let node = targetNode;

        while (node && (node !== state.rootNode))
        {
            activeNodes.push(node);

            node = node.parent;
        }

        activeNodes.reverse();

        activeNodes.forEach(node =>
        {
            if (!node.children?.length) return;

            expandedNodes.push(node);
        });

        return { activeNodes, expandedNodes };
    }),
    setSearchResult: (searchValue: string, offers: IPurchasableOffer[], filteredNodes: ICatalogNode[]) => set(state =>
    {
        if (!searchValue || !searchValue.length) return { searchResult: null };

        if (searchValue === state.searchResult?.searchValue) return state;

        const searchResult = { searchValue, offers, filteredNodes };

        return { searchResult };
    }),
    setCatalogNeedsUpdate: (flag: boolean) => set({ catalogNeedsUpdate: flag })
}));

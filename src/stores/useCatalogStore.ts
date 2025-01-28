import { CatalogType, ICatalogNode, ICatalogPage, IPurchasableOffer, SendMessageComposer } from '#base/api/index.ts';
import { FrontPageItem, GetCatalogPageComposer, NodeData } from '@nitrots/nitro-renderer';
import { create } from 'zustand';

interface CatalogSlice
{
    catalogType: string;
    rootNode: ICatalogNode;
    activeNodes: ICatalogNode[];
    expandedNodes: ICatalogNode[];
    offerNodes: { [key: string]: ICatalogNode[] };
    searchResult: { searchValue: string; offers: IPurchasableOffer[]; filteredNodes: ICatalogNode[] };
    currentPage: ICatalogPage;
    currentPageId: number;
    currentOffer: IPurchasableOffer;
    frontPageItems: FrontPageItem[];
    navigationVisible: boolean;
    catalogNeedsUpdate: boolean;
    processNodeData: (nodeData: NodeData) => void;
    selectNode: (targetNode: ICatalogNode, offerId?: number) => void;
    setSearchResult: (searchValue: string, offers: IPurchasableOffer[], filteredNodes: ICatalogNode[]) => void;
    setCurrentPage: (currentPage: ICatalogPage) => void;
    setCurrentOffer: (currentOffer: IPurchasableOffer) => void;
    setFrontPageItems: (frontPageItems: FrontPageItem[]) => void;
    setCatalogNeedsUpdate: (flag: boolean) => void;
}

export const useCatalogStore = create<CatalogSlice>(set => ({
    catalogType: CatalogType.NORMAL,
    rootNode: null,
    activeNodes: [],
    expandedNodes: [],
    offerNodes: {},
    searchResult: { searchValue: '', offers: [], filteredNodes: [] },
    currentPage: null,
    currentPageId: -1,
    currentOffer: null,
    frontPageItems: [],
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
    selectNode: (targetNode: ICatalogNode, offerId: number = -1) => set(state =>
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

        let activeNodes = state.activeNodes;
        let expandedNodes = state.expandedNodes;

        if (activeNodes?.[activeNodes.length - 1] !== targetNode)
        {
            activeNodes = [];

            let node = targetNode;

            while (node && (node !== state.rootNode))
            {
                activeNodes.push(node);

                node = node.parent;
            }

            activeNodes.reverse();
        }

        const index = expandedNodes?.indexOf(targetNode);

        if (index >= 0)
        {
            expandedNodes = expandedNodes.slice(0, index);
        }
        else
        {
            expandedNodes = [];

            activeNodes.forEach(node =>
            {
                if (!node.children?.length) return;

                expandedNodes.push(node);
            });
        }

        const newState: Partial<CatalogSlice> = { activeNodes, expandedNodes };

        if (targetNode.pageId > -1)
        {
            newState.currentPageId = targetNode.pageId;

            SendMessageComposer(new GetCatalogPageComposer(targetNode.pageId, offerId, state.catalogType));
        }

        return newState;
    }),
    setSearchResult: (searchValue: string, offers: IPurchasableOffer[], filteredNodes: ICatalogNode[]) => set(state =>
    {
        if (!searchValue || !searchValue.length) return { searchResult: null };

        if (searchValue === state.searchResult?.searchValue) return state;

        const searchResult = { searchValue, offers, filteredNodes };

        return { searchResult };
    }),
    setCurrentPage: (currentPage: ICatalogPage) => set({ currentPage, currentOffer: null }),
    setCurrentOffer: (currentOffer: IPurchasableOffer) => set({ currentOffer }),
    setFrontPageItems: (frontPageItems: FrontPageItem[]) => set({ frontPageItems }),
    setCatalogNeedsUpdate: (flag: boolean) => set({ catalogNeedsUpdate: flag })
}));
